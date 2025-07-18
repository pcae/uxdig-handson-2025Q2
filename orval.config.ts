const { loadEnvConfig } = require('@next/env')
const { defineConfig } = require('orval')

loadEnvConfig(process.cwd())

export default defineConfig({
  api: {
    input: {
      target: 'shared/api/resources/swagger.yaml',
      /**
       * Orvalをバージョン6.20.0 に更新したら、自動生成が検証でTypeErrorを発生し失敗してます。
       * 更新の前、同じOASファイルではエラーが発生しないため、エラーの原因は不明です。
       * なので、今の所はValidationをfalseにします。
       * 今後のリリースで検証の問題が修正されたら、またtrueに戻します。
       */
      validation: false,
    },
    output: {
      target: 'src/api/generated/{project-name}.api.ts',
      client: 'react-query',
      prettier: true,
      mock: {
        useExample: true,
        locale: 'ja',
      },
      mode: 'split',
      override: {
        mutator: {
          path: 'src/api/httpClient.ts',
          name: 'httpClient',
        },
      },
    },
  },
})
