import { APIError } from '@/common/APIError';
import { generateErrorToast, generateSuccessToast } from '@/common/util';
import { addDeviceThunk } from '@/store/slices/device/deviceThunk';
import { useAppDispatch } from '@/store/hook';
import { IAddDeviceRequest, IDeviceDataFormat } from '@/types/device';
import { AddIcon } from '@chakra-ui/icons';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select,
    Checkbox, SimpleGrid, Stack, CheckboxGroup, useDisclosure, useToast,
    Icon,
    VStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from '@chakra-ui/react';

import { ChangeEvent, useEffect, useState } from 'react';

export const coverageOptions = {
    Smartphone: [
        "Accidental Damage Protection",
        "Battery Replacement",
        "Power Surge Protection",
        "Wear and Tear Coverage",
        "Mechanical and Electrical Failures",
        "Water Damage Protection",
        "Loss and Theft Protection"
    ],
    "Consumer Electronics": [
        "Accidental Damage Protection",
        "Power Surge Protection",
        "Wear and Tear Coverage",
        "Mechanical and Electrical Failures"
    ],
    "Home Appliances": [
        "Mechanical and Electrical Failures",
        "Power Surge Protection",
        "Wear and Tear Coverage",
        "Water Damage Protection",
        "Refrigerant Replenishment"
    ],
    "" : []
};

export type DeviceType = 'Smartphone' | 'Consumer Electronics' | 'Home Appliances' | '';


export const planNames: Record<DeviceType, string> = {
    "Smartphone" : "Asurion Phone Device Protection Plan",
    "Consumer Electronics": "Asurion Consumer Electronics Protection Plan",
    "Home Appliances" : "Asurion Home Appliances Plan",
    "": ""
};

interface IAddDeviceModalProps {
    userId: string;
    fetchDevices: () => Promise<void>;
}

const defaultDeviceData: IDeviceDataFormat = {
    name: "",
    type: "",
    manufacturer: "",
    modelNumber: "",
    serialNumber: "",
    purchaseDate: "",
    warrantyExpiryDate: "",
    hasProtectionPlan: false,
    protectionPlan: {
        planName: "",
        durationMonths: 1,
        coverage: []
    }
}


const AddDeviceModal = ({ userId, fetchDevices }: IAddDeviceModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useAppDispatch();

    const [deviceType, setDeviceType ] = useState<DeviceType | "">("");
    const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
    const [deviceData, setDeviceData] = useState<IDeviceDataFormat>(defaultDeviceData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "type"){
            setDeviceType(value as DeviceType);
        }
        setDeviceData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleProtectionPlanChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setDeviceData(prevState => ({
            ...prevState,
            protectionPlan: {
                ...prevState.protectionPlan,
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setDeviceData(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = async () => {
        try{
            const formattedAddedDevice: IAddDeviceRequest = {
                userId: userId,
                name: deviceData.name,
                type: deviceData.type,
                manufacturer: deviceData.manufacturer,
                modelNumber: deviceData.modelNumber,
                serialNumber: deviceData.serialNumber,
                purchaseDate: new Date(deviceData.purchaseDate),
                warrantyExpiryDate: new Date(deviceData.warrantyExpiryDate),
                ...(deviceData.protectionPlan && { protectionPlan: deviceData.protectionPlan })
            }
            await dispatch(addDeviceThunk(formattedAddedDevice)).unwrap();
            onClose()
            toast(generateSuccessToast("Device has been successfully added"))
            setDeviceData(defaultDeviceData);
            fetchDevices();
        } catch (e) {
            const error = e as APIError;
            console.error(error);
            toast(generateErrorToast(error.message, error.description));
        }
    };

    useEffect(() => {

        const updatedCoverages = coverageOptions[deviceType];
        setSelectedCoverages(updatedCoverages);
        setDeviceData(prevState => ({
            ...prevState,
            protectionPlan: {
                ...prevState.protectionPlan,
                planName: planNames[deviceType],
                coverage: coverageOptions[deviceType]
            }
        }));
        
    }, [deviceType]);

    return (
        <>
            <Button leftIcon={<Icon as={AddIcon} />} colorScheme="purple" onClick={onOpen}>
                    Add Device
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Device</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={deviceData.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="type" isRequired>
                                <FormLabel>Type</FormLabel>
                                <Select name="type" value={deviceData.type} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="Smartphone">Smartphone</option>
                                    <option value="Consumer Electronics">Consumer Electronics</option>
                                    <option value="Home Appliances">Home Appliances</option>
                                </Select>
                            </FormControl>
                            <FormControl id="manufacturer" isRequired>
                                <FormLabel>Manufacturer</FormLabel>
                                <Input
                                    name="manufacturer"
                                    value={deviceData.manufacturer}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="modelNumber" isRequired>
                                <FormLabel>Model Number</FormLabel>
                                <Input
                                    name="modelNumber"
                                    value={deviceData.modelNumber}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="serialNumber" isRequired>
                                <FormLabel>Serial Number</FormLabel>
                                <Input
                                    name="serialNumber"
                                    value={deviceData.serialNumber}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="purchaseDate" isRequired>
                                <FormLabel>Purchase Date</FormLabel>
                                <Input
                                    name="purchaseDate"
                                    type="date"
                                    value={deviceData.purchaseDate}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="warrantyExpiryDate" isRequired>
                                <FormLabel>Warranty Expiry Date</FormLabel>
                                <Input
                                    name="warrantyExpiryDate"
                                    type="date"
                                    value={deviceData.warrantyExpiryDate}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl mt={4}>
                            <Checkbox
                                name="hasProtectionPlan"
                                isChecked={deviceData.hasProtectionPlan}
                                onChange={handleCheckboxChange}
                            >
                                Add Asurion Protection Plan
                            </Checkbox>
                        </FormControl>

                        {deviceData.hasProtectionPlan && (
                            <VStack mt={5}>
                                <FormControl id="planName" isRequired>
                                    <FormLabel>Plan Name</FormLabel>
                                    <Input
                                        name="planName"
                                        value={deviceData.protectionPlan.planName}
                                        onChange={handleProtectionPlanChange}
                                        isReadOnly // Automatically set based on type
                                    />
                                </FormControl>
                                <FormControl id="durationMonths" isRequired>
                                    <FormLabel>Duration (Months)</FormLabel>
                                    <NumberInput
                                        name="durationMonths"
                                        value={deviceData.protectionPlan.durationMonths}
                                        onChange={(valueString) => handleProtectionPlanChange({target: {name: "durationMonths", value: valueString}} as ChangeEvent<HTMLInputElement>)}
                                        min={1}
                                        max={12}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                {deviceData.protectionPlan.planName && (
                                    <FormControl id="coverage" isRequired>
                                    <FormLabel>Coverage</FormLabel>
                                    <CheckboxGroup
                                        colorScheme="purple">
                                        <Stack>
                                            {selectedCoverages.map(option => (
                                                <Checkbox key={option} isChecked={true} isDisabled={true}>
                                                    {option}
                                                </Checkbox>
                                            ))}
                                        </Stack>
                                    </CheckboxGroup>
                                </FormControl>
                                )}
                            </VStack>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="purple" onClick={handleSubmit}>
                            Add Device
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddDeviceModal;
