export type Province = {
  province_id: string;
  province_name: string;
};

export type City = {
  city_id: string;
  city_name: string;
  city_type: string;
};

export type ProvincesSuccessResponse = {
    status: boolean
    message: string
    data: Array<{
        province_id: string
        province_name: string
    }>
    timestamp: string
}

export type CitySuccessResponse = {
    status: boolean
    message: string
    data: Array<{
        city_id: string
        city_name: string
        city_type: string
    }>
    timestamp: string
}