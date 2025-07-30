import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertPlayerConfigSchema, type InsertPlayerConfig, type PlayerConfig } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link, Play, Wand2, CheckCircle, Loader2 } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const [generatedConfig, setGeneratedConfig] = useState<PlayerConfig | null>(null);
  const [activeTab, setActiveTab] = useState("signup");
  const [copying, setCopying] = useState<string | null>(null);

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
      setGeneratedConfig(config);
      setActiveTab("login");
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

  const copyToClipboard = async (text: string, type: string) => {
    setCopying(type);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => setCopying(null), 1000);
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Titillium Web, sans-serif'
    }}>
      {/* Header inspired by template */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Play className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Video Player Generator</h1>
            </div>
            <span className="text-sm text-gray-600">Template by Dayat.ID - Ready for Vercel</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Form container with styling similar to the template */}
        <div className="form" style={{
          maxWidth: '400px',
          margin: '0 auto',
          position: 'relative',
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          paddingTop: '50px',
          paddingBottom: '50px'
        }}>
          {/* Tab group */}
          <ul className="tab-group" style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 40px 0',
            display: 'flex'
          }}>
            <li className={`tab ${activeTab === 'signup' ? 'active' : ''}`} style={{
              flex: 1,
              textAlign: 'center'
            }}>
              <a 
                href="#signup" 
                onClick={(e) => {e.preventDefault(); setActiveTab('signup')}}
                style={{
                  display: 'block',
                  padding: '15px',
                  color: activeTab === 'signup' ? '#1ab188' : '#a0b3b0',
                  textDecoration: 'none',
                  borderBottom: activeTab === 'signup' ? '3px solid #1ab188' : 'none',
                  transition: 'all 0.5s ease'
                }}
              >
                Create
              </a>
            </li>
            <li className={`tab ${activeTab === 'login' ? 'active' : ''}`} style={{
              flex: 1,
              textAlign: 'center'
            }}>
              <a 
                href="#login" 
                onClick={(e) => {e.preventDefault(); setActiveTab('login')}}
                style={{
                  display: 'block',
                  padding: '15px',
                  color: activeTab === 'login' ? '#1ab188' : '#a0b3b0',
                  textDecoration: 'none',
                  borderBottom: activeTab === 'login' ? '3px solid #1ab188' : 'none',
                  transition: 'all 0.5s ease'
                }}
              >
                Code
              </a>
            </li>
          </ul>

          <div className="tab-content">
            {/* Create Tab */}
            {activeTab === 'signup' && (
              <div id="signup" style={{ padding: '0 40px' }}>
                <h1 style={{ 
                  textAlign: 'center', 
                  color: '#300', 
                  fontWeight: 300, 
                  margin: '0 0 40px'
                }}>
                  Create Player
                </h1>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="top-row" style={{ display: 'flex', gap: '10px' }}>
                      <div className="field-wrap" style={{ flex: 1 }}>
                        <FormField
                          control={form.control}
                          name="playerType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                                Player<span style={{ color: '#c0392b' }}>*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger style={{
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '2px solid #c0c0c0',
                                    borderRadius: 0,
                                    outline: 0,
                                    fontSize: '14px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    padding: '5px 0'
                                  }}>
                                    <SelectValue placeholder="Select Player" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fluidplayer">Fluid Player</SelectItem>
                                  <SelectItem value="jwpl">JWPlayer</SelectItem>
                                  <SelectItem value="plyr">Plyr.io</SelectItem>
                                  <SelectItem value="video">Video</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="field-wrap" style={{ flex: 1 }}>
                        <FormField
                          control={form.control}
                          name="provider"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                                Provider<span style={{ color: '#c0392b' }}>*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value} disabled={!playerType}>
                                <FormControl>
                                  <SelectTrigger style={{
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '2px solid #c0c0c0',
                                    borderRadius: 0,
                                    outline: 0,
                                    fontSize: '14px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    padding: '5px 0'
                                  }}>
                                    <SelectValue placeholder="Select Provider" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gdrive">Google Drive</SelectItem>
                                  <SelectItem value="rand">Random</SelectItem>
                                  <SelectItem value="yt">Youtube</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="field-wrap">
                      <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                              Format Video<span style={{ color: '#c0392b' }}>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="disabled"
                                disabled
                                value={playerType ? formatOptions[playerType] : ""}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  borderBottom: '2px solid #c0c0c0',
                                  borderRadius: 0,
                                  outline: 0,
                                  fontSize: '14px',
                                  fontFamily: 'inherit',
                                  resize: 'vertical',
                                  padding: '5px 0',
                                  color: '#999'
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="field-wrap">
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                              Link Video<span style={{ color: '#c0392b' }}>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                type="url"
                                placeholder="Link Video"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  borderBottom: '2px solid #c0c0c0',
                                  borderRadius: 0,
                                  outline: 0,
                                  fontSize: '14px',
                                  fontFamily: 'inherit',
                                  resize: 'vertical',
                                  padding: '5px 0'
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={createPlayerMutation.isPending}
                      style={{
                        fontFamily: 'Roboto',
                        textTransform: 'uppercase',
                        outline: 0,
                        background: '#1ab188',
                        width: '100%',
                        border: 0,
                        padding: '15px',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'all 0.3 ease',
                        ':hover': {
                          background: '#179b77'
                        }
                      }}
                      className="button button-block"
                    >
                      {createPlayerMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Confirm
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'login' && (
              <div id="login" style={{ padding: '0 40px' }}>
                <h1 style={{ 
                  textAlign: 'center', 
                  color: '#300', 
                  fontWeight: 300, 
                  margin: '0 0 40px'
                }}>
                  Your Code here
                </h1>
                
                <div className="field-wrap" style={{ marginBottom: '15px' }}>
                  <label style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                    Iframe Code<span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Textarea
                      id="ifcode"
                      value={generatedConfig?.iframeCode || ""}
                      readOnly
                      rows={6}
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom: '2px solid #c0c0c0',
                        borderRadius: 0,
                        outline: 0,
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        resize: 'vertical',
                        padding: '5px 0',
                        width: '100%',
                        minHeight: '100px'
                      }}
                    />
                    {generatedConfig && (
                      <Button
                        onClick={() => copyToClipboard(generatedConfig.iframeCode, "Iframe code")}
                        disabled={copying === "iframe"}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          background: '#1ab188',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        {copying === "iframe" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="field-wrap">
                  <label style={{ color: '#999', fontSize: '12px', textTransform: 'uppercase' }}>
                    Link<span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Textarea
                      id="links"
                      value={generatedConfig?.directLink || ""}
                      readOnly
                      rows={3}
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom: '2px solid #c0c0c0',
                        borderRadius: 0,
                        outline: 0,
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        resize: 'vertical',
                        padding: '5px 0',
                        width: '100%'
                      }}
                    />
                    {generatedConfig && (
                      <Button
                        onClick={() => copyToClipboard(generatedConfig.directLink, "Link")}
                        disabled={copying === "link"}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          background: '#1ab188',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        {copying === "link" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    )}
                  </div>
                </div>

                {generatedConfig && (
                  <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h3 style={{ margin: 0, color: '#2d5a2d', fontSize: '16px' }}>Deployment Ready!</h3>
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#5a5a5a' }}>
                      Your video player is ready for Vercel deployment.
                    </p>
                    <Button
                      onClick={() => window.open('https://vercel.com/new', '_blank')}
                      style={{
                        background: '#000',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 7.5L12 0L0 7.5v9L12 24l12-7.5v-9z" />
                      </svg>
                      Deploy to Vercel
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
