import { useState } from "react";
import { useNotification } from "../../../contexts/NotificationContext";
import { IUserResponse } from "../types/user.types";
import { userService } from "../service/user.service";
import { ResponseDtoPagination } from "@/features/shared";

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const { showNotification } = useNotification();

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.get<
        ResponseDtoPagination<IUserResponse>
      >("",{page:String(page+1),limit:String(limit)});
      if (response.success && response.data) {
        const userResponse =
          response.data as ResponseDtoPagination<IUserResponse>;
        setUsers(userResponse?.data || []);
        setTotal(userResponse.pagination.total);
      } else {
        showNotification("error", "Error al cargar los usuarios");
        setUsers([]);
      }
    } catch {
      showNotification("error", "Error al cargar los usuarios");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    loading,
    users,
    getUsers,
    handlePageChange,
    total,
    setTotal,
    page,
    limit,
    setLimit,
  };
};
