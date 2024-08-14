type AuthHeader = {
    Authorization: string;
};

const getSingleTrack = async (headers: AuthHeader, trackId: string): Promise<any | null> => {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to get results - ${response.statusText}`);
    }
    const jsonResult = await response.json();

    return jsonResult;
}

export default getSingleTrack