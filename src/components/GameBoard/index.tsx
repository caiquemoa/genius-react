import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import GamePad from '../GamePad'

export function GameBoard() {
	const [yellowPad, setYellowPad] = useState(false)
	const [greenPad, setGreenPad] = useState(false)
	const [redPad, setRedPad] = useState(false)
	const [bluePad, setBluePad] = useState(false)

	const [canPlay, setCanPlay] = useState(false)
	const [canStartSequence, setCanStartSequence] = useState(false)
	const [colorSequence, setColorSequence] = useState<number[]>([])
	const [clickIndex, setClickIndex] = useState(0)
	const [score, setScore] = useState(0)
	const stopAll = useRef(false)
	function clearBoard() {
		setCanPlay(false)
		setColorSequence([])
		setCanStartSequence(false)
		setScore(0)
		setClickIndex(0)
		stopAll.current = false
	}

	useEffect(() => {
		if (canStartSequence && colorSequence.length > 0) {
			setCanPlay(false)
			let index = 0
			const interval = setInterval(() => {
				if (index === colorSequence.length) {
					setCanStartSequence(false)
					setClickIndex(0)
					setCanPlay(true)
					clearInterval(interval)
					return
				}

				if (stopAll.current) {
					clearBoard()
					clearInterval(interval)
				}

				blinkPad(colorSequence[index])
				index++
			}, 600)
		}
	}, [canStartSequence, colorSequence])

	function checkOrder(click: number) {
		if (canPlay) {
			blinkPad(click)
			if (click !== colorSequence[clickIndex]) {
				clearBoard()
				setTimeout(() => alert('you lost'), 300)
				return
			}
			if (clickIndex === colorSequence.length - 1) {
				setClickIndex(0)
				setScore(score + 1)
				setColorSequence([...colorSequence, Math.ceil(Math.random() * 4)])
				setTimeout(() => setCanStartSequence(true), 800)
				return
			}
			setClickIndex(clickIndex + 1)
		}
	}

	function startGame() {
		if (colorSequence.length > 0) {
			return (stopAll.current = true)
		}
		setColorSequence([...colorSequence, Math.ceil(Math.random() * 4)])
		setCanStartSequence(true)
		return
	}

	function blinkPad(num: number) {
		const delay = 200

		switch (num) {
			case 1:
				setYellowPad(true)
				setTimeout(() => {
					setYellowPad(false)
				}, delay)
				break
			case 2:
				setGreenPad(true)
				setTimeout(() => {
					setGreenPad(false)
				}, delay)
				break
			case 3:
				setRedPad(true)
				setTimeout(() => {
					setRedPad(false)
				}, delay)
				break
			case 4:
				setBluePad(true)
				setTimeout(() => {
					setBluePad(false)
				}, delay)
				break
		}
	}

	return (
		<Flex flexDir="column" borderRadius="100%" position="relative">
			<Flex>
				<GamePad
					onClick={() => {
						checkOrder(1)
					}}
					isPadActive={yellowPad}
					padColor="yellow"
				/>
				<GamePad
					onClick={() => {
						checkOrder(2)
					}}
					isPadActive={greenPad}
					padColor="green"
				/>
			</Flex>
			<Flex
				borderRadius="100%"
				border="20px solid black"
				bg="gray.400"
				h={['160px', '200px', '250px', '300px']}
				w={['160px', '200px', '250px', '300px']}
				position="absolute"
				left="0"
				right="0"
				top="0"
				bottom="0"
				margin="auto"
				justify="center"
				align="center"
				flexDir={'column'}
				gap="4"
			>
				<Text fontSize="3xl" fontWeight="bold" h="1.875rem" color="white">
					{score}
				</Text>
				<Button
					onClick={startGame}
					colorScheme={colorSequence.length > 0 ? 'red' : 'whatsapp'}
				>
					{colorSequence.length > 0 ? 'Restart' : 'Start'}
				</Button>
			</Flex>
			<Flex>
				<GamePad
					onClick={() => {
						checkOrder(3)
					}}
					isPadActive={redPad}
					padColor="red"
				/>
				<GamePad
					onClick={() => {
						checkOrder(4)
					}}
					isPadActive={bluePad}
					padColor="blue"
				/>
			</Flex>
		</Flex>
	)
}
