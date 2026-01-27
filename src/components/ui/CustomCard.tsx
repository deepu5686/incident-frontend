import { Box, CardActionArea, CardContent, Divider, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import React from "react"

interface CustomCardProps {
  cardHeaderText: string
  children: React.ReactNode
}

export const CustomCard = (props: CustomCardProps) => {
  const { children, cardHeaderText } = props
  return (
    <Card
      sx={{
        width: 250,
        height: 200,
        display: 'flex',
      }}
    >
      <CardActionArea
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{color:'text.primary'}}>
              {cardHeaderText}
            </Typography>
          </Box>
          <Divider />

          <Box>
            {children}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}