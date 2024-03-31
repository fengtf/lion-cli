import { transformAsync } from '@babel/core';
import { readFileSync, removeSync, outputFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { replaceCssImportExt } from '../common/css';
import { replaceScriptImportExt } from './get-deps';

export function compileJs(filePath: string): Promise<undefined> {
  return new Promise((resolve, reject) => {
    let code = readFileSync(filePath, 'utf-8');

    code = replaceCssImportExt(code); // 将scss转成css
    code = replaceScriptImportExt(code, '.vue', ''); // 将import ...vue后缀去掉

    transformAsync(code, { filename: filePath })
      .then((result) => {
        // console.log('result****', result);
        if (result) {
          const jsFilePath = replaceExt(filePath, '.js');
          removeSync(filePath);
          outputFileSync(jsFilePath, result.code);
          resolve(undefined);
        }
      })
      .catch(reject);
  });
}
