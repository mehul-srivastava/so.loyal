"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Web3WalletButton } from "@/components/ConnectWalletButton";

export const formSchema = z.object({
  websiteName: z
    .string()
    .min(2, { message: "Please enter more than 2 characters" })
    .max(70, { message: "Please enter less than 70 characters" }),
  websiteLink: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(2, { message: "Please enter more than 2 characters" })
    .max(70, { message: "Please enter less than 70 characters" }),
  walletPublicAddress: z.string().min(1, { message: "Please enter a wallet address" }),
  brandColor: z.string().min(3, { message: "Please choose a brand color" }),
  supportEmail: z.string().email({ message: "Please enter a valid email" }),
  supportPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(10, { message: "Please enter a valid phone number" }),
});

const OnboardingForm = () => {
  const router = useRouter();

  const { publicKey, connected, connecting } = useWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: "",
      websiteLink: "",
      brandColor: "#28ef34",
      supportEmail: "",
      supportPhone: "",
      walletPublicAddress: connected ? publicKey!.toString() : "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/merchant/onboarding", values);
      router.push("/dashboard");
      toast.success("Onboarding complete!");
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-x-8">
          <FormField
            control={form.control}
            name="websiteName"
            render={({ field }) => (
              <FormItem className="col-span-5">
                <FormLabel>Website Name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="100xdevs" {...field} />
                </FormControl>
                <FormDescription>What is the name of your website?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteLink"
            render={({ field }) => (
              <FormItem className="col-span-5">
                <FormLabel>Website Link</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="https://100xdevs.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What is the magical link for your website?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandColor"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Brand Color</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="color"
                    className="ring-black"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Choose your brand color.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-12">
          <FormField
            control={form.control}
            name="walletPublicAddress"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>
                  Wallet's Public Address <small>(Connect a devnet wallet)</small>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="0x76d3047740Cf71400DcfF74AbeA12eC834ff5035"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="!mt-0">
                  {connecting && "Loading..."}
                  {!connected && (
                    <Web3WalletButton action="connect" text="Show Wallets" />
                  )}
                  {connected && (
                    <div className="flex gap-x-4">
                      <Button
                        variant="link"
                        className="text-white px-0 font-normal text-xs"
                        onClick={(event) => field.onChange(publicKey?.toString())}
                      >
                        Paste
                      </Button>
                      <Web3WalletButton
                        action="disconnect"
                        text="Disconnect Wallet"
                        onClickFn={() => field.onChange("")}
                      />
                    </div>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-x-8">
          <FormField
            control={form.control}
            name="supportPhone"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Support Phone</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="9811698116" {...field} />
                </FormControl>
                <FormDescription>What is your helpdesk contact no.?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supportEmail"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Support Email</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="100xdevs@gmail.com" {...field} />
                </FormControl>
                <FormDescription>What is your helpdesk email adress?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          Complete {isSubmitting && <LoaderIcon className="ml-2" />}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
