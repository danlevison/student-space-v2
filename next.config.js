/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(mp3)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[hash].[ext]",
					publicPath: "/_next/static/media",
					outputPath: "static/media"
				}
			}
		})

		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org"
			}
		]
	}
}

module.exports = nextConfig
