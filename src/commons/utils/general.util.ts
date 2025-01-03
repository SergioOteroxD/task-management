// eslint-disable-next-line @typescript-eslint/no-var-requires
const rTracer = require('cls-rtracer');
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CustomException } from '../../core/common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../response-codes/general-codes';

export class GeneralUtils {
  public static get getTraceId(): string {
    return rTracer.id() || '';
  }

  public static get getUuid(): string {
    return uuidv4();
  }

  public static async encryptPassword(
    password: string,
    pepper: string,
  ): Promise<string> {
    try {
      // Generamos un salt aleatorio para mejorar la seguridad
      const salt = await bcrypt.genSalt(10);

      // Concatenamos la contraseña y el pepper
      const pepperedPassword = password + pepper;

      // Encriptamos la contraseña con el salt y el pepper
      const hash = await bcrypt.hash(pepperedPassword, salt);

      // Devolvemos la contraseña encriptada
      return hash;
    } catch (error) {
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'GeneralUtils.encryptPassword',
        'Technical',
        error,
      );
    }
  }

  public static async comparePassword(
    password: string,
    hash: string,
    pepper: string,
  ): Promise<boolean> {
    // Concatenamos la contraseña y el pepper
    const pepperedPassword = password + pepper;

    // Comparamos la contraseña con su versión encriptada con el pepper
    const match = await bcrypt.compare(pepperedPassword, hash);

    // Devolvemos true si las contraseñas coinciden, false en caso contrario
    return match;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static generateHash(length: number, prefix?: string): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }

  /**
   *
   * @param length
   * @returns
   */
  public static generateId(length: number, prefix?: string): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (prefix) result = prefix + result;
    return result;
  }

  static encodeBase64(str: string): string {
    return Buffer.from(str).toString('base64');
  }

  static decodeBase64(encodedStr: string): string {
    return Buffer.from(encodedStr, 'base64').toString('utf-8');
  }

  static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : type;
  }
}
