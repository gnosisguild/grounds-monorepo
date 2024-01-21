import React, { useState } from "react"
import { Stack, Container, Box, Button } from "@mui/material"
import GroundsLogo from "../assets/imgs/logo.svg"
import WalletModal from "./WalletModal"

import { useWeb3React } from "@web3-react/core"
import { useWalletContext } from "../context/wallet"

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const { isActive } = useWeb3React()
  const { disconnect } = useWalletContext()

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <Box
      sx={{
        background: "#e0d6d4",
        paddingY: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            minHeight: 64,
            "& img": {
              transition: "transform 0.2s ease-in-out",
            },
            "& img:hover": {
              transform: "scale(0.9)",
            },
          }}
        >
          <img src={GroundsLogo} alt="Grounds Logo" height={40} width={150} />
          <Button variant="contained" color="error" onClick={!isActive ? handleOpenModal : disconnect}>
            {!isActive ? "Connect" : "Disconnect"}
          </Button>
          <WalletModal
            open={isModalOpen}
            onClose={handleCloseModal}
            activeConnectionType={null}
            isConnectionActive={false}
          />
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
