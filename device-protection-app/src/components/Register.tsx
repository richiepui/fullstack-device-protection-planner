import React from 'react';
import { RootState } from '../store/store';
import { Box, Button, Input, Flex, useToast, FormControl, FormLabel, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { APIError } from '@/common/APIError';
import { generateErrorToast, generateSuccessToast } from '@/common/util';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router';
import { registerThunk } from '@/store/slices/auth/authThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';


const Register = () => {

    const dispatch = useAppDispatch();
    const toast = useToast();
    const router = useRouter();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async () => {
        try{
            await dispatch(registerThunk({username, password})).unwrap()
            toast(generateSuccessToast("Account successfully created"));
            router.push('/users/login')
        } catch (e) {
            const error = e as APIError;
            console.error(error);
            toast(generateErrorToast(error.message, error.description));
        }
    }

    const goToLogin = () => {
        router.push("/users/login")
    }


    return (
        <Flex align="center" justify="center" height="50vh" p={4}> 
            <Box bg="white" p={8} maxW="md" borderRadius="lg" boxShadow="lg" width="30%" position="relative">
                 <IconButton
                    icon={<ArrowBackIcon />}
                    aria-label="Back to login"
                    onClick={goToLogin}
                    position="absolute"
                    top={4}
                    left={4}
                    fontSize="24px"
                    variant="ghost"
                    colorScheme="purple"
                />
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Sign Up
                </Heading>
    
                    <FormControl mb={4}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input id="username" type="text" value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        borderColor="gray.300"
                        _hover={{borderColor: "gray.400"}}
                        _focus={{borderColor: "blue.500", boxShadow: 'outline'}}
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            _hover={{borderColor: "gray.400"}}
                            _focus={{borderColor: "blue.500", boxShadow: 'outline'}}
                             borderColor="gray.300"
                            />
                    </FormControl>

                    <Button
                        mt={4}
                        onClick={handleRegistration}
                        colorScheme="purple"
                        size="lg"
                        width="full"
                        isLoading={isLoading}>
                            Create Account
                    </Button>
    
            </Box>
        </Flex>
    )


}

export default Register