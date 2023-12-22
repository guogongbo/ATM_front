'use strict'
module.exports = {
    publicPath: "./",
    devServer: {
        port: 3000,  // 此处修改你想要的端口号，
        proxy: {
            '/BankTransfer': {
                target: 'http://8.139.5.168:8080',
                changeOrigin: true,
            }

        },
    }
}
