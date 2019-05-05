const backendURL = 'http://localhost:8080';

export const suggestServer = `/suggester`;
export const geocoderServer = `/geocoder`;
export const notesServer = `/create_point`;
export const revGeocoderServer = `/rev_geocoder`;

export const authServer = `${ backendURL }/login`;
export const logoutServer = `${ backendURL }/logout`;

export const checkAuthServer = `${ backendURL }/check_auth`;
export const profileServer = `${ backendURL }/get_user_detail`;
export const anonimPointsServer = `${ backendURL }/add_points_from_cookie`;

export const statsServer = `/get_statistic`;