import { remove } from 'fs-extra';
import { LIB_DIR, ES_DIR } from '../common/constant';

export async function clean() {
  await Promise.all([remove(ES_DIR)]);
  await Promise.all([remove(LIB_DIR)]);
}
