import { Box, Flex, Text, Image} from '@chakra-ui/react';

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
    
    return (
        <Flex
            direction="column" 
            minHeight="100vh"
            backgroundImage="url('/images/devices.jpg')"
            backgroundSize="cover"
            backgroundPosition="center">
            <Header/>
            <Box flex="1">
                {children}
            </Box>
            <Footer/>
        </Flex>
    )
}

export default DefaultLayout


const Header = () => {
    return (
        <Flex as="header" bg="white" color="black" p={3} boxShadow="sm" align="center" justify="space-between">
            <Image src="../images/asurion-logo_svg.svg" alt="Asurion Logo" pl={2} height="40px" />
        </Flex>
    )
}

const Footer = () => {
    return (
      <Box bg="purple.500" color="white" p={4} textAlign="center" mt="auto">
        <Text>&copy; 2024 Asurion. All rights reserved.</Text>
      </Box>
    );
  }