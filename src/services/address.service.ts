import type { ApiClient } from "@/lib/client";
import type { ApiResponse, CreateAddressRequest, UpdateAddressRequest, AddressDTO } from "@/types";

export async function createAddress(client: ApiClient, data: CreateAddressRequest) {
  return client.post<ApiResponse<AddressDTO>>("/api/v1/addresses", data);
}

export async function listAddresses(client: ApiClient) {
  return client.get<ApiResponse<AddressDTO[]>>("/api/v1/addresses");
}

export async function getAddress(client: ApiClient, id: number) {
  return client.get<ApiResponse<AddressDTO>>(`/api/v1/addresses/${id}`);
}

export async function getDefaultAddress(client: ApiClient) {
  return client.get<ApiResponse<AddressDTO>>("/api/v1/addresses/default");
}

export async function updateAddress(client: ApiClient, id: number, data: UpdateAddressRequest) {
  return client.put<ApiResponse<AddressDTO>>(`/api/v1/addresses/${id}`, data);
}

export async function setDefaultAddress(client: ApiClient, id: number) {
  return client.put<ApiResponse<AddressDTO>>(`/api/v1/addresses/${id}/default`, {});
}

export async function deleteAddress(client: ApiClient, id: number) {
  return client.del<ApiResponse<null>>(`/api/v1/addresses/${id}`);
}
