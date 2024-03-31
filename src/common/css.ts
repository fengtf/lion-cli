import { get } from 'lodash';
import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import { getLionConfig } from '../common';
import { STYLE_DIR, SRC_DIR } from './constant';

type CSS_LANG = 'css' | 'less' | 'scss';

function getCssLang(): CSS_LANG {
  const lionConfig = getLionConfig();
  const preprocessor = get(lionConfig, 'build.css.preprocessor', 'scss');
  console.log('preprocessor', preprocessor);
  if (preprocessor === 'sass') {
    return 'scss';
  }

  return 'scss';
}

export const CSS_LANG = getCssLang();

export function getCssBaseFile() {
  const lionConfig = getLionConfig();
  let path = join(STYLE_DIR, `base.${CSS_LANG}`);

  const baseFile = get(lionConfig, 'build.css.base', '');
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile);
  }

  if (existsSync(path)) {
    return path;
  }

  return null;
}

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// "import 'a.less';" => "import 'a.css';"
export function replaceCssImportExt(code: string) {
  return code.replace(IMPORT_STYLE_RE, (str) =>
    str.replace(`.${CSS_LANG}`, '.css')
  );
}
