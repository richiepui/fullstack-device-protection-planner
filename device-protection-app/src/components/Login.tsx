import React from 'react';
import { loginThunk } from '@/store/slices/auth/authThunk';
import { RootState } from '../store/store';
import { Box, Button, Input, Text, Flex, useToast, FormControl, FormLabel, Heading, FormErrorMessage, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { APIError } from '@/common/APIError';
import { generateErrorToast, generateSuccessToast } from '@/common/util';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';

const Login = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const toast = useToast();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
        try{
            await dispatch(loginThunk({username, password})).unwrap();
            toast(generateSuccessToast("Login Successful"));
            router.push("/devices");
        } catch(e) {
            const error = e as APIError;
            console.error(error);
            toast(generateErrorToast(error.message, error.description));
        }
    }

    return (
        <Flex align="center" justify="center" height="50vh" p={4}>
            <Box bg="white" p={8} maxW={'md'} borderRadius="lg" boxShadow="lg" width="30%">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Login
                </Heading>
                <FormControl mb={4}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: 'outline' }}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: 'outline' }}
                    />
                </FormControl>
                <Button
                    onClick={handleLogin}
                    colorScheme="purple"
                    size="lg"
                    width="full"
                    isLoading={isLoading}
                >
                    Login
                </Button>
                <Text textAlign="center" mt={4}>
                    Don't have an account?{" "}
                    <Link href="/users/register" color="purple.500" fontWeight="bold">
                        Register here
                    </Link>
                </Text>
            </Box>
        </Flex>
    )
}

export default Login