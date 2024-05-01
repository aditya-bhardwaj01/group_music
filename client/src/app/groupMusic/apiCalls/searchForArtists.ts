type AuthHeader = {
    Authorization: string;
};

async function searchForArtist(headers: AuthHeader, artistName: string): Promise<any | null> {
    const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        console.error(`Failed to search for artist: ${response.statusText}`);
        return null;
    }

    const jsonResult = await response.json();
    const artists = jsonResult.artists.items;

    if (artists.length === 0) {
        console.log("No artist with this name exists.");
        return null;
    }

    return artists[0];
}

export default searchForArtist;