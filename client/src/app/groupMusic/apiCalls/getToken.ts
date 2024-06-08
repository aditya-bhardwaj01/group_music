let accessToken: string | null = null;
let tokenExpiryTime: Date | null = null;

// Get or refresh the Spotify API token
async function getToken(): Promise<string> {
    if (accessToken && tokenExpiryTime && new Date() < tokenExpiryTime) return accessToken;

    const CLIENT_ID = "607554faa3ca4077ad2713a169843a17";
    const CLIENT_SECRET = "34adba9b9fba4b98a0c4eaae9e4d92dd";

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Client ID and Client Secret must be set in environment variables.');
    }

    const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const authBase64 = btoa(authString);

    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        Authorization: `Basic ${authBase64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = 'grant_type=client_credentials';

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: data,
    });

    if (!response.ok) {
        throw new Error(`Failed to obtain token - ${response.statusText}`);
    }

    const jsonResult: any = await response.json();
    accessToken = jsonResult.access_token;

    tokenExpiryTime = new Date();
    tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + jsonResult.expires_in);

    if (accessToken === null) {
        throw new Error("Failed to get a valid access token.");
    }

    return accessToken;
}

export default getToken;