import React from "react"
import { Modal, Box, Typography, Button, IconButton, Grid } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
// Wallets logos
import MetaMaskLogo from "../assets/wallets/metamask.svg"
import WalletConnectLogo from "../assets/wallets/walletConnect.svg"
import CoinbaseWalletLogo from "../assets/wallets/coinbase.svg"
import {
  ConnectionType,
  tryActivateConnector,
  tryDeactivateConnector,
  getConnection,
} from "../services/connection/Connections"
import { useWalletContext } from "../context/wallet"

interface WalletModalProps {
  open: boolean
  onClose: () => void
  activeConnectionType: ConnectionType | null
  isConnectionActive: boolean
}

const WalletModal: React.FC<WalletModalProps> = ({ open, onClose, activeConnectionType, isConnectionActive }) => {
  const { setCurrentConnectionType } = useWalletContext()
  const handleWalletConnection = async (connectionType: ConnectionType) => {
    if (isConnectionActive && activeConnectionType === connectionType) {
      // Attempt to deactivate
      const deactivation = await tryDeactivateConnector(getConnection(connectionType).connector)
      if (deactivation === undefined) {
        onClose()
        return // Handle error
      }
    } else {
      // Attempt to activate
      onClose()
      const activation = await tryActivateConnector(getConnection(connectionType).connector)
      if (!activation) {
        return // Handle error
      }
      setCurrentConnectionType(activation)
    }
  }
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Connect your wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={() => handleWalletConnection(ConnectionType.INJECTED)}
              startIcon={<img src={MetaMaskLogo} alt="MetaMask" style={{ width: 24, height: 24 }} />}
            >
              MetaMask
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={() => handleWalletConnection(ConnectionType.WALLET_CONNECT)}
              startIcon={<img src={WalletConnectLogo} alt="WalletConnect" style={{ width: 24, height: 24 }} />}
            >
              WalletConnect
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={() => handleWalletConnection(ConnectionType.COINBASE_WALLET)}
              startIcon={<img src={CoinbaseWalletLogo} alt="Coinbase Wallet" style={{ width: 24, height: 24 }} />}
            >
              Coinbase Wallet
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default WalletModal
