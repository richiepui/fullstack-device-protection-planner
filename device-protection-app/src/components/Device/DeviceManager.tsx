import React, { useEffect } from 'react';
import { Box, SimpleGrid, Flex, useToast, Heading, Icon } from '@chakra-ui/react';
import DeviceCard from './DeviceCard';
import { RootState, useAppDispatch } from '@/store/store';
import { fetchDevicesThunk } from '@/store/slices/device/deviceThunk';
import { APIError } from '@/common/APIError';
import { generateErrorToast } from '@/common/util';
import { useAppSelector } from '@/store/hook';
import AddDeviceModal from './AddDeviceModal';


const DeviceManager = () => {

    const dispatch = useAppDispatch();
    const toast = useToast();
    const userId  = useAppSelector((state: RootState) => state.auth.userId);
    const devices = useAppSelector((state) => state.device.devices); 


    const fetchDevices = async () => {
        try{
            await dispatch(fetchDevicesThunk(userId as string))
        } catch (e) {
            const error = e as APIError;
            console.error(error);
            toast(generateErrorToast(error.message, error.description))
        }
    }

    useEffect(() => {
        fetchDevices();
    }, [userId]);

    
    return (
        <>
            <Flex 
                justify="space-between" 
                align="center" 
                mb={4} 
                bg="white" 
                p={5}
                boxShadow="md"
            >
                <Heading size="md">Current Devices</Heading>
                <AddDeviceModal userId={userId!} fetchDevices={fetchDevices}/>
            </Flex>
            <Box p={4}  boxShadow ="md"  height="70vh" overflowY="auto" 
            sx={{
                "::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                    backgroundColor: "#a3a3a3",
                    borderRadius: "10px",
                    border: "2px solid #f1f1f1",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#888",
                },
                "::-webkit-scrollbar-corner": {
                    backgroundColor: "transparent",
                },
            }}>
            <SimpleGrid columns={{ base:1, md: 2, lg: 5}} spacing={6}>
                {devices.map((device) => (
                    <DeviceCard fetchDevices={fetchDevices} key={device.serialNumber} device={device}/>
                ))}
            </SimpleGrid>
        </Box>
        </>
    )

}

export default DeviceManager