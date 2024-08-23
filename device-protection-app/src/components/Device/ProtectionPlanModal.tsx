import { useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input,
    Checkbox, CheckboxGroup, Stack, useDisclosure, useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack
} from '@chakra-ui/react';
import { IDevice } from '@/types/device';
import { coverageOptions, DeviceType, planNames } from './AddDeviceModal';
import { APIError } from '@/common/APIError';
import { generateErrorToast, generateSuccessToast } from '@/common/util';
import { useAppDispatch } from '@/store/hook';
import { addProtectionPlanThunk, extendProtectionPlanThunk } from '@/store/slices/device/deviceThunk';

interface ProtectionPlanModalProps {
    device: IDevice;
    handleAddExtendProtectionOperation: () => void;
}

const ProtectionPlanModal = ({ device, handleAddExtendProtectionOperation }: ProtectionPlanModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useAppDispatch();

    const planName = planNames[device.type as DeviceType];
    const coverage = coverageOptions[device.type as DeviceType];

    const [durationMonths, setDurationMonths] = useState(1);
    const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
    
    const handleAddOrExtend = async () => {
        if (device.protectionPlan && device.protectionPlan.status === "Active"){
            try{
                await dispatch(extendProtectionPlanThunk({deviceId: device.deviceId, extendedData: {durationMonths: durationMonths}})).unwrap()
                toast(generateSuccessToast("New Protection Plan Added"))
            } catch (e) {
                const error = e as APIError;
                console.error(error);
                toast(generateErrorToast(error.message, error.description));
            }

        } else {
            try{
                await dispatch(addProtectionPlanThunk({deviceId: device.deviceId, protectionData: { planName: planName, durationMonths: durationMonths, coverage: coverage}}))
                toast(generateSuccessToast("Protection Plan extended"));
            } catch (e) {
                const error = e as APIError;
                console.error(error);
                toast(generateErrorToast(error.message, error.description));
            }
        }

        onClose();
        handleAddExtendProtectionOperation();
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="purple">
                {device.protectionPlan ? (device.protectionPlan.status === "Active" ? "Extend Plan" : "Add New Plan") : "Add Plan"}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{device.protectionPlan && device.protectionPlan.status === "Active" ? "Extend Protection Plan" : "Add Protection Plan"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {device.protectionPlan && device.protectionPlan.status === "Active" ? (
                            <FormControl id="durationMonths" isRequired>
                                <FormLabel>Extend by (Months)</FormLabel>
                                <NumberInput
                                    name="durationMonths"
                                    value={durationMonths}
                                    onChange={(valueString) => setDurationMonths(Number(valueString))}
                                    min={1}
                                    max={12}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        ) : (
                            <VStack>
                                <FormControl id="planName" isRequired>
                                    <FormLabel>Plan Name</FormLabel>
                                    <Input
                                        name="planName"
                                        value={planName}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl id="durationMonths" isRequired>
                                    <FormLabel>Duration (Months)</FormLabel>
                                    <NumberInput
                                        name="durationMonths"
                                        value={durationMonths}
                                        onChange={(valueString) => setDurationMonths(Number(valueString))}
                                        min={1}
                                        max={12}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                                <FormControl id="coverage" isRequired>
                                    <FormLabel>Coverage</FormLabel>
                                    <CheckboxGroup
                                        colorScheme="purple"
                                        value={selectedCoverages}
                                        onChange={(values: string[]) => setSelectedCoverages(values)}>
                                        <Stack>
                                            {coverage.map(option => (
                                                <Checkbox key={option} isChecked={true} isDisabled={true}>
                                                    {option}
                                                </Checkbox>
                                            ))}
                                        </Stack>
                                    </CheckboxGroup>
                                </FormControl>
                            </VStack>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="purple" onClick={handleAddOrExtend}>
                            {device.protectionPlan && device.protectionPlan.status === "Active" ? "Extend Plan" : "Add Plan"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProtectionPlanModal;
