import { AxiosResponse } from 'axios';
import {
  TwitchInvalidTokenResponseDTO,
  TwitchValidTokenResponseDTO,
} from '../handlers/DTO/TwitchValidateResponseDTO';

export function isInvalidToken(
  data: AxiosResponse<
    TwitchInvalidTokenResponseDTO | TwitchValidTokenResponseDTO
  >['data'],
): data is TwitchInvalidTokenResponseDTO {
  return 'status' in data;
}
