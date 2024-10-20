"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useModal from "@/store/useModal";
import { UseUserStore } from "@/store/useUserStore"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

export function AddUserModal() {
  const { modals, toggleModal, closeModal } = useModal();
  const { createUser } = UseUserStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data:any) => {
    await createUser(data);
    closeModal("user");
    reset();
  };

  return (
    <Dialog open={modals.user} onOpenChange={(open) => toggleModal("user")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add a new user to your organization.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="username" className="text-right">
                Name
              </Label>
              <Input
                id="username"
                placeholder="John Doe"
                className="col-span-3"
                {...register("username", { required: true })}
              />
              {errors.username && <p className="text-red-600 text-xs">Name is required</p>}
            </div>
            <div className="">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="john@example.com"
                className="col-span-3"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-600 text-xs">Email is required</p>}
            </div>
            <div className="">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="col-span-3"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-600 text-xs">Password is required</p>}
            </div>
            <div>
                <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} defaultValue={value} value={value}>
                    <Label htmlFor="role" className="text-right">
                        Role
                    </Label>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                )}
                />
                {errors.role && <p className="text-red-600 text-xs">Role is required</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Add user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


