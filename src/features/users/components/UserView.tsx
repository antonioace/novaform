import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
} from "@mui/material";
import { IUserResponse } from "../types/user.types";

interface UserViewProps {
  user: IUserResponse;
}

const UserView: React.FC<UserViewProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", mt: 2 }}>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
            {user.username?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </div>
        </div>

        {user.roles && user.roles.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Roles:
            </Typography>
            <div className="flex flex-wrap gap-2">
              {user.roles.map((userRole) => (
                <Chip
                  key={userRole.id}
                  label={userRole.role.name}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </div>
          </>
        )}

        {user.permissions && user.permissions.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Permisos directos:
            </Typography>
            <List dense>
              {user?.permissions.map((permission) => (
                <ListItem key={permission.id}>
                  <ListItemText
                    primary={permission?.permission?.name}
                    secondary={permission?.permission?.description}
                  />
                  <Chip
                    label={permission?.permission?.code}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserView;
