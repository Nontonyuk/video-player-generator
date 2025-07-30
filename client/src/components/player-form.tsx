import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertPlayerConfigSchema, type InsertPlayerConfig, type PlayerConfig } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Settings, ChevronDown, Link, Play, Cog } from "lucide-react";
import { useState } from "react";

interface PlayerFormProps {
  onConfigGenerated: (config: PlayerConfig) => void;
}

export default function PlayerForm({ onConfigGenerated }: PlayerFormProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const form = useForm<InsertPlayerConfig>({
    resolver: zodResolver(insertPlayerConfigSchema),
    defaultValues: {
      playerType: "" as any,
      provider: "" as any,
      videoUrl: "",
      autoplay: false,
      controls: true,
      format: ""
    }
  });

  const createPlayerMutation = useMutation({
    mutationFn: async (data: InsertPlayerConfig) => {
      const response = await apiRequest("POST", "/api/player-config", data);
      return response.json() as Promise<PlayerConfig>;
    },
    onSuccess: (config) => {
      toast({
        title: "Success",
        description: "Player code generated successfully!"
      });
      onConfigGenerated(config);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate player code",
        variant: "destructive"
      });
    }
  });

  const playerType = form.watch("playerType");
  
  const formatOptions = {
    'fluidplayer': 'MP4, WebM, HLS',
    'jwpl': 'MP4, HLS, DASH',
    'plyr': 'MP4, WebM, YouTube, Vimeo',
    'video': 'MP4, WebM, OGV'
  };

  const onSubmit = (data: InsertPlayerConfig) => {
    createPlayerMutation.mutate({
      ...data,
      format: formatOptions[data.playerType] || 'Auto-detected'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Configure Your Video Player</h2>
        <p className="text-[var(--vercel-gray)]">Set up your video player configuration and generate deployment-ready code.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="playerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Player Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Player" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fluidplayer">Fluid Player</SelectItem>
                      <SelectItem value="jwpl">JW Player</SelectItem>
                      <SelectItem value="plyr">Plyr.io</SelectItem>
                      <SelectItem value="video">HTML5 Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Content Provider <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!playerType}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gdrive">Google Drive</SelectItem>
                      <SelectItem value="rand">Random</SelectItem>
                      <SelectItem value="yt">Youtube</SelectItem>
                    </SelectContent>
                  </Select>
                  {!playerType && (
                    <p className="text-xs text-[var(--vercel-gray)]">Select a player type first</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Video Format</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="Auto-detected based on provider"
                    disabled
                    value={playerType ? formatOptions[playerType] : ""}
                    className="bg-gray-50 text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Video URL <span className="text-red-500">*</span>
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      {...field}
                      type="url"
                      placeholder="https://example.com/video.mp4"
                      className="pr-10"
                    />
                  </FormControl>
                  <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <p className="text-xs text-[var(--vercel-gray)]">Enter the direct URL to your video file</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Cog className="w-4 h-4 mr-2" />
                <span className="font-medium text-gray-700">Advanced Options</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-lg">
              <div className="p-4 space-y-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="autoplay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Autoplay</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span className="text-sm text-gray-600">Enable autoplay</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="controls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Controls</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span className="text-sm text-gray-600">Show controls</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={createPlayerMutation.isPending}
              className="bg-[var(--vercel-blue)] text-white px-8 py-3 font-medium hover:bg-blue-600"
            >
              {createPlayerMutation.isPending ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Player Code
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
