function getAuthHeader(token: string) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

export default getAuthHeader;