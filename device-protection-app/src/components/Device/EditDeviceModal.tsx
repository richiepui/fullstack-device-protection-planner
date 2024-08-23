import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, useDisclosure, SimpleGrid,
    useToast
} from '@chakra-ui/react';
import { IDevice } from '@/types/device';
import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '@/store/hook';
import { generateErrorToast, generateSuccessToast } from '@/common/util';
import { APIError } from '@/common/APIError';
import { updateDeviceThunk } from '@/store/slices/device/deviceThunk';

interface EditDeviceModalProps {
    device: IDevice;
    handleUpdateOperations: () => void;
}

const EditDeviceModal = ({ device, handleUpdateOperations }: EditDeviceModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedDevice, setUpdatedDevice] = useState<IDevice>(device);

    const toast = useToast();
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedDevice(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try{
            await dispatch(updateDeviceThunk(updatedDevice)).unwrap();
            toast(generateSuccessToast("Device successfully updated"));
            onClose();
            handleUpdateOperations();
        } catch (e) {
            const error = e as APIError;
            console.error;
            toast(generateErrorToast(error.message, error.description))
        }
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="purple" variant="outline">
                Edit Device
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Device</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="name"
                                    value={updatedDevice.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="type">
                                <FormLabel>Type</FormLabel>
                                <Input
                                    name="type"
                                    disabled
                                    value={updatedDevice.type}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="manufacturer">
                                <FormLabel>Manufacturer</FormLabel>
                                <Input
                                    disabled
                                    name="manufacturer"
                                    value={updatedDevice.manufacturer}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="modelNumber">
                                <FormLabel>Model Number</FormLabel>
                                <Input
                                    disabled
                                    name="modelNumber"
                                    value={updatedDevice.modelNumber}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="serialNumber">
                                <FormLabel>Serial Number</FormLabel>
                                <Input
                                    disabled
                                    name="serialNumber"
                                    value={updatedDevice.serialNumber}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="purchaseDate" isRequired>
                                <FormLabel>Purchase Date</FormLabel>
                                <Input
                                    name="purchaseDate"
                                    type="date"
                                    value={updatedDevice.purchaseDate ? new Date(updatedDevice.purchaseDate).toISOString().split('T')[0] : ""}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="warrantyExpiryDate" isRequired>
                                <FormLabel>Warranty Expiry Date</FormLabel>
                                <Input
                                    name="warrantyExpiryDate"
                                    type="date"
                                    value={updatedDevice.warrantyExpiryDate ? new Date(updatedDevice.warrantyExpiryDate).toISOString().split('T')[0] : ""}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="purple" onClick={handleSubmit}>
                            Update Device
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditDeviceModal;
