"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/nextjs";

export default function ProfileSettings() {
  // const { userId } = useAuth();
  // const { user } = useUser();
  const data: any = [];

  // const [avatarSrc, setAvatarSrc] = useState(
  //   "/placeholder.svg?height=100&width=100"
  // );

  // const { data } = useQuery({
  //   queryKey: ["employee-updates"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(
  //         `/api/get-user-info/${user?.emailAddresses[0]?.emailAddress}`
  //       )
  //         .then((res: any) => res.json())
  //         .then((data: any) => {
  //           // console.log(data.data);
  //           return data.data;
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and set your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={data?.photo as string} alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input
                type="file"
                id="avatar-upload"
                className="sr-only"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <CameraIcon className="mr-2 h-4 w-4" />
                Change Avatar
              </Label>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={data?.fullnames}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={data?.EmailAddress}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Engineering"
                value={data?.department}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Textarea id="skills" placeholder="List your key skills" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
