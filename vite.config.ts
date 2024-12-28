import {defineConfig, loadEnv} from 'vite'
import path, {resolve} from "path";
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { createHtmlPlugin } from "vite-plugin-html"; // 修改index.html 中的title信息
// components
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取当前工作目录
  const root = process.cwd();

  // 获取环境变量
  const env: any = loadEnv(mode, root)
  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        "@assets": path.join(__dirname, "src/assets"),
      },
    },
    plugins: [
        vue(),
        createHtmlPlugin({
          inject: {
            data: {
              title: env.VITE_GLOB_APP_TITLE
            }
          }
        }),
        createSvgIconsPlugin({
          // 配置src下存放svg的路径，这里表示在src/assets/svgs文件夹下
          iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
          symbolId: "icon-[dir]-[name]"
        }),
        AutoImport({
          imports: [
              'vue',
              'vue-router'
          ],
          // arco组件的按需加载
          resolvers: [ArcoResolver()],
          // 解决eslint报错问题
          eslintrc: {
            // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
            enabled: false,
            filepath: "./.eslintrc-auto-import.json", // 生成的文件路径
            globalsPropValue: true
          },
          dts: 'src/auto-import.d.ts'
        }),
        Components({
          resolvers: [
            // arco组件的按需加载
            ArcoResolver({
              sideEffect: true
            })
          ],
          // 自动加载组件的目录配置,默认的为 'src/components'
          dirs: ["src/components"],
          // 组件的有效文件扩展名
          extensions: ["vue"],
          // 配置文件生成位置
          dts: "src/components.d.ts"
        }),
        // mock server
        viteMockServe({
          mockPath: "./src/mock/",
          logger: true,
          supportTs: true,
          localEnabled: env.VITE_APP_OPEN_MOCK === "true",
          prodEnabled: env.VITE_APP_OPEN_MOCK === "true",
          injectCode: `
            import { setupProdMockServer } from './mock/_createProdMockServer'
            setupProdMockServer()
          `
        })
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/style/global" as *;
          `
        }
      }
    }
  }

});
