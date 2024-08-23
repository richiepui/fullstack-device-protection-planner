import React from 'react';
import {
    Box, Text, Button, Flex, Drawer, DrawerBody, DrawerFooter, DrawerHeader,
    DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Heading, Grid, GridItem, Badge, VStack, Image,
    SimpleGrid,
    HStack,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react';
import { IDevice } from '@/types/device';
import EditDeviceModal from './EditDeviceModal';
import DeleteDeviceModal from './DeleteDeviceModal';
import ProtectionPlanModal from './ProtectionPlanModal';

interface IDeviceCardProps {
    device: IDevice
    fetchDevices: () => Promise<void>;
}

const DeviceCard = ({ device, fetchDevices }: IDeviceCardProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobile = useBreakpointValue({base: true, md: false});


    const handleRefreshOperation = () => {
        fetchDevices();
    }

    const handleDeleteOperation = () => {
        onClose();
        fetchDevices();
    }

    return (
        <>
            <Box border="1px solid #e2e8f0" borderRadius="md" p={4} boxShadow="md" _hover={{boxShadow:'lg'}} bg="white">
                <Flex direction="column" align="center">
                    <Box
                        bg="gray.200"
                        borderRadius="md"
                        mb={4}
                        height="150px"
                        width="150px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            src="/images/placeholder.jpg" 
                            objectFit="cover"
                            boxSize="100%"/>
                    </Box>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        {device.name}
                    </Text>
                    <Button bg="purple.600" color="white" size="sm" width="full" _hover={{bg: "yellow.500"}} onClick={onOpen}>
                        View Device
                    </Button>
                </Flex>
            </Box>  

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{device.name}</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={2} align="stretch">
                            <Flex align={isMobile ? 'flex-start' : 'center'} direction={isMobile ? 'column': 'row'} py={4} gap={4}>
                                <Box
                                    
                                    flex="1"
                                    width="100%"
                                    mb={isMobile ? 4 : 0}>
                                    <Heading as="h1" mb={2}>{device.name}</Heading>
                                    <Text fontSize="lg" color="gray.600" mb={1}>{device.type}</Text>
                                    <Text fontSize="md" color="gray.500">{device.manufacturer}</Text>
                                </Box>

                                <Stack 
                                    direction={isMobile ? "column" : "row"}
                                    spacing={isMobile ? 4 : 3}
                                    ml={isMobile ? 0 : "auto"}
                                    width={isMobile ? "full" : "auto"}>
                                    <EditDeviceModal device={device} handleUpdateOperations={handleRefreshOperation} />
                                    <ProtectionPlanModal device={device} handleAddExtendProtectionOperation={handleRefreshOperation}/>
                                    <DeleteDeviceModal deviceId={device.deviceId} deviceName={device.name} handleDeleteOperation={handleDeleteOperation}/>
                                </Stack>
                            </Flex>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                                    <Heading fontSize="21px" >Device Info</Heading>
                                    <Text mt={2}><strong>Model Number:</strong> {device.modelNumber}</Text>
                                    <Text mt={2}><strong>Serial Number:</strong> {device.serialNumber}</Text>
                                </Box>

                                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                                    <Heading fontSize="21px">Purchase & Warranty</Heading>
                                    <Text mt={2}><strong>Purchase Date:</strong> {new Date(device.purchaseDate).toLocaleDateString('en-GB')}</Text>
                                    <Text mt={2}><strong>Warranty Expiry Date:</strong> {new Date(device.warrantyExpiryDate).toLocaleDateString('en-GB')}</Text>
                                </Box>

                                {device.protectionPlan && (
                                    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                                        <HStack>
                                            <Heading fontSize="21px">Protection Plan</Heading>
                                            <Badge colorScheme={device.protectionPlan.status === "Active" ? "green" : "red"}>
                                                {device.protectionPlan.status}
                                            </Badge>
                                        </HStack>
                                        <Text mt={2}><strong>Plan Name:</strong> {device.protectionPlan.planName}</Text>
                                        <Text mt={2}><strong>Start Date:</strong> {new Date(device.protectionPlan.startDate).toLocaleDateString('en-GB')}</Text>
                                        <Text mt={2}><strong>End Date:</strong> {new Date(device.protectionPlan.endDate).toLocaleDateString('en-GB')}</Text>
                                        <Text mt={2}><strong>Coverage:</strong> {device.protectionPlan.coverage.join(', ')}</Text>
                                    </Box>
                                )}

                                {device.claimHistory.length > 0 && (
                                    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                                        <Heading fontSize="21px">Claim History</Heading>
                                        {device.claimHistory.map((claim, index) => (
                                            <Box key={index} mt={4}>
                                                <Text><strong>Date:</strong> {new Date(claim.date).toLocaleDateString('en-GB')}</Text>
                                                <Text><strong>Type:</strong> {claim.type}</Text>
                                                <Text><strong>Resolution:</strong> {claim.resolution}</Text>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {device.aiRecommendations.length > 0 && (
                                    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                                        <Heading fontSize="21px">AI Recommendations</Heading>
                                        <VStack align="start" mt={4}>
                                            {device.aiRecommendations.map((recommendation, index) => (
                                                <Text key={index}>{recommendation}</Text>
                                            ))}
                                        </VStack>
                                    </Box>
                                )}
                            </SimpleGrid>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DeviceCard;
