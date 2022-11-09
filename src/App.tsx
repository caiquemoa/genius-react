import { Flex } from '@chakra-ui/react'
import { GameBoard } from './components/GameBoard'

function App() {
	return (
		<Flex justify="center" align="center" h="100vh">
			<GameBoard />
		</Flex>
	)
}

export default App
