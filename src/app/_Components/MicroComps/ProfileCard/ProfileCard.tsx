'use client'

import { IUserProfileData } from "@/app/_Interfaces/IUserData";
import { uploadUserAvatar } from "@/utils/profileHelpers/changeAvatarImg";
import { Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { MdLocationOn, MdEdit, MdPhone, MdCameraAlt } from "react-icons/md";

interface ProfileCardProps {
  userData: IUserProfileData;
  userAddress: string;
  userPhone: string;
  openModalWithField: (label: string, name: string, value: string) => void;
}

export default function ProfileCard(
    {userData, userAddress, userPhone, openModalWithField}:ProfileCardProps){

        const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const result = await uploadUserAvatar(file);

            if (result?.error) {
                toast.error('Avatar upload failed:' + result.error || 'Avatar upload failed:')
                return;
            }else {
                toast.success("Avatar updated successfully!");

            }
        };
 
    return(
        <>
            <Card className="">
            <CardContent>
              <Box className="flex items-center gap-4 mb-4 relative">
                    <Box className="relative">
                        <Avatar src={userData?.avatarUrl} sx={{ width: 75, height: 75 }}/>
                        <Tooltip title="Edit Avatar">
                            <IconButton component='label' size="small" sx={{ position: 'absolute', bottom: 0, right: 0, 
                                        backgroundColor: 'white', border: '1px solid #ccc', padding: '.3rem', 
                                        '&:hover': { backgroundColor: '#eee', }, }}>
                                <MdCameraAlt size={20} />
                                <input type="file" accept="image/*" hidden onChange={(e) => handleAvatarChange(e)}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                <Box>
                  <Typography variant="h6">{userData.name}</Typography>
                  <Chip label="Authorized" size="small" color="success" />
                </Box>
              </Box>
                <Stack sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Typography>Email: {userData.email}</Typography>
                    
                     <Box className="flex items-center justify-between">
                        <Typography className="flex items-center">
                            <MdLocationOn className="mr-1" />
                            {userAddress ? `Address: ${userAddress}` : 'No Address'}
                        </Typography>
                        <Tooltip title="Edit Address">
                            <IconButton onClick={() => openModalWithField('Address', 'address', userAddress)}>
                            <MdEdit />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box className="flex items-center justify-between">
                        <Typography className="flex items-center">
                            <MdPhone className="mr-1" />
                            {userPhone ? `Phone: +20 ${userPhone}` : 'No Phone'}
                        </Typography>
                        <Tooltip title="Edit Phone">
                            <IconButton onClick={() => openModalWithField('Phone', 'phone', userPhone)}>
                            <MdEdit />
                            </IconButton>
                        </Tooltip>
                    </Box>

                   
                </Stack>
            </CardContent>


            </Card>
        
        </>
    )
}