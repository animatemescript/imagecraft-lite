exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, headers } = event;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
  
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    };
  }
  
  if (path.includes('/auth/google')) {
    if (path.includes('/callback')) {
      const code = queryStringParameters?.code;
      
      if (!code) {
        return {
          statusCode: 302,
          headers: {
            Location: '/?auth=error'
          }
        };
      }
      
      try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: `https://imagecraftlite.in/.netlify/functions/auth/google/callback`
          })
        });
        
        const tokens = await tokenResponse.json();
        
        if (tokens.error) {
          return {
            statusCode: 302,
            headers: {
              Location: '/?auth=error'
            }
          };
        }
        
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`
          }
        });
        
        const user = await userResponse.json();
        
        const userSession = JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          loginTime: new Date().toISOString()
        });
        
        return {
          statusCode: 302,
          headers: {
            Location: '/?auth=success',
            'Set-Cookie': `user_session=${encodeURIComponent(userSession)}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/`
          }
        };
        
      } catch (error) {
        return {
          statusCode: 302,
          headers: {
            Location: '/?auth=error'
          }
        };
      }
    } else {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const redirectUri = `https://imagecraftlite.in/.netlify/functions/auth/google/callback`;
      const scope = 'profile email';
      
      const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline`;
      
      return {
        statusCode: 302,
        headers: {
          Location: googleAuthUrl
        }
      };
    }
  }
  
  if (path.includes('/auth/user')) {
    const cookies = headers.cookie || '';
    const userSessionMatch = cookies.match(/user_session=([^;]+)/);
    
    if (userSessionMatch) {
      try {
        const userSession = JSON.parse(decodeURIComponent(userSessionMatch[1]));
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(userSession)
        };
      } catch (error) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid session' })
        };
      }
    }
    
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not authenticated' })
    };
  }
  
  return {
    statusCode: 404,
    headers: corsHeaders,
    body: JSON.stringify({ error: 'Not found' })
  };
};
