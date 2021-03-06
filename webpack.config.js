const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

const extractCSS = new ExtractTextPlugin('[name].css');
const gitRevision = new GitRevisionPlugin({ lightweightTags: true });

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/dist"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|woff|ttf|woff2|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            hash: "sha512",
                            digest: "hex",
                            name: "[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.tsx?/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.s?css$/,
                loader: extractCSS.extract([
                    {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        query: {
                            sourceMap: true
                        }
                    }
                ])
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/' }
            ]
        },
    },
    plugins: [
        extractCSS,
        new Webpack.DefinePlugin({
            // Taken and adapted from the official README.
            // See: https://www.npmjs.com/package/git-revision-webpack-plugin
            "MUMBLE_BOT_VERSION": JSON.stringify(gitRevision.version())
        })
    ],
};
