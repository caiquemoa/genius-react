import { extendTheme } from '@chakra-ui/react'

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		game: {
			yellow: '#fcfc01',
			// ...
			green: '#25e125',
		},
	},
	styles: {
		global: {
			body: {
				bg: 'gray.400',
			},
		},
	},
})
