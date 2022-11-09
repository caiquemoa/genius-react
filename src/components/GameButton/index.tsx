import { Box, BoxProps } from '@chakra-ui/react'

type ColorProps = {
	offColor: string
	activeColor: string
	borderRadius: string
	borderdWidth: string
}

interface PadProps {
	[key: string]: ColorProps
}

interface GameButtonProps extends BoxProps {
	isPadActive?: boolean
	padColor: string
}

export default function GameButton({
	isPadActive,
	padColor,
	...rest
}: GameButtonProps) {
	const pad: PadProps = {
		yellow: {
			offColor: '#b99700',
			activeColor: '#fffb29',
			borderRadius: '300px 0 0 0',
			borderdWidth: '20px 10px 10px 20px',
		},
		green: {
			offColor: '#026913',
			activeColor: '#16ff3d',
			borderRadius: '0 300px 0 0',
			borderdWidth: '20px 20px 10px 10px',
		},
		red: {
			offColor: '#8d0000',
			activeColor: '#ff1616',
			borderRadius: '0 0 0 300px',
			borderdWidth: '10px 10px 20px 20px',
		},
		blue: {
			offColor: '#000f98',
			activeColor: '#0a22ff',
			borderRadius: '0 0 300px 0',
			borderdWidth: '10px 20px 20px 10px',
		},
	}

	return (
		<Box
			h={['160px', '200px', '250px', '300px']}
			w={['160px', '200px', '250px', '300px']}
			bg={isPadActive ? pad[padColor].activeColor : pad[padColor].offColor}
			borderRadius={pad[padColor].borderRadius}
			border="solid black"
			borderWidth={pad[padColor].borderdWidth}
			{...rest}
		/>
	)
}
