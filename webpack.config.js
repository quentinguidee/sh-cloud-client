const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "out"),
        filename: "bundle.[hash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.png/,
                exclude: /node_modules/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".sass"],
        alias: {
            Assets: path.resolve(__dirname, "src/Assets/"),
            Backend: path.resolve(__dirname, "src/Backend/"),
            Components: path.resolve(__dirname, "src/Components/"),
            Layouts: path.resolve(__dirname, "src/Layouts/"),
            Models: path.resolve(__dirname, "src/Models/"),
            Pages: path.resolve(__dirname, "src/Pages/"),
            Store: path.resolve(__dirname, "src/Store/"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, "public", "favicon.ico"),
            filename: "index.html",
        }),
        new Dotenv({
            path: ".env",
            systemvars: true,
        }),
    ],
};
