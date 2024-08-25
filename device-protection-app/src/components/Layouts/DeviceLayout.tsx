import { Box, Flex, Image, Text, Avatar, Wrap, WrapItem } from '@chakra-ui/react';


interface DashboardLayoutProps {
    children: React.ReactNode
    username: string
}

interface HeaderProps {
    username: string
}


const DeviceLayout = ({ children, username }: DashboardLayoutProps ) => {
    return (
        <Flex direction="column" minHeight="100vh" bg="white">
            <Header username={username} />
                <Box flex="1" p={4}>
                    {children}
                </Box>
            <Footer />
        </Flex>
    );
}

export default DeviceLayout

const Header = ({username}: HeaderProps) => {
    return (
        <Flex as="header" bg="white" p={3} boxShadow="sm" align="center" justify="space-between">
            <Image src="/images/asurion-logo_svg.svg" alt="Asurion Logo" pl={2} height="40px" />
            <Flex align="center" gap={4} mx={4}>
                <Wrap>
                    <WrapItem>
                        <Avatar size="sm"/>
                    </WrapItem>
                </Wrap>
                <Text fontSize="lg" fontWeight="bold" fontFamily="Arial" color="purple.600">{username}</Text>
            </Flex>
        </Flex>
    );
}

const Footer = () => {
    return (
        <Box bg="purple.500" color="white" p={4} textAlign="center" mt="auto">
            <Text>&copy; 2024 Asurion. All rights reserved.</Text>
        </Box>
    );
}
