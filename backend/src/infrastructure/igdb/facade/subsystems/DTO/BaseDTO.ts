/**
 * Represents the base data transfer object (DTO) for a resource.
 */
export interface BaseDTO {
  checksum?: number;
  created_at?: number;
  updated_at?: number;
}

export type StaticBaseDTO = Pick<BaseDTO, 'checksum'>;
