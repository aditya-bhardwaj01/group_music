type AuthHeader = {
    Authorization: string;
};

async function searchForResults(headers: AuthHeader, artistName: string, type: string): Promise<any | null> {
    const url = `https://api.spotify.com/v1/search?q=${artistName}&type=${type}&limit=5`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to get results - ${response.statusText}`);
    }

    const jsonResult = await response.json();
    let result = [];
    switch (type) {
        case 'track':
            result = jsonResult.tracks.items;
            break;
        case 'artist':
            result = jsonResult.artists.items;
            break;
        case 'album':
            result = jsonResult.albums.items;
            break;
        case 'playlist':
            result = jsonResult.playlists.items
            break;
        default:
            result = []
    }

    if (result.length === 0) {
        return null;
    }

    return result;
}

export default searchForResults;