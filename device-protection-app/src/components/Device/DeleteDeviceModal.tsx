import { APIError } from "@/common/APIError";
import { generateErrorToast, generateSuccessToast } from "@/common/util";
import { deleteDeviceThunk } from "@/store/slices/device/deviceThunk";
import { useAppDispatch } from "@/store/hook";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Text, useDisclosure, useToast } from "@chakra-ui/react";

interface IDeleteDeviceModalProps {
    deviceId: string;
    deviceName: string;
    handleDeleteOperation: () => void;
}

const DeleteDeviceModal = ({deviceId, deviceName, handleDeleteOperation}: IDeleteDeviceModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        try{
            await dispatch(deleteDeviceThunk(deviceId)).unwrap()
            toast(generateSuccessToast("Device deleted Successfully"))
            handleDeleteOperation();
        } catch (e) {
            const error = e as APIError;
            console.error()
            toast(generateErrorToast(error.message, error.description))
        }
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="red" variant="outline">
                Delete Device
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete device {deviceName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete this device? This will also remove any protection plans bound to this device.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteDeviceModal;
