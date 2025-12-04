; ModuleID = 'marshal_methods.x86_64.ll'
source_filename = "marshal_methods.x86_64.ll"
target datalayout = "e-m:e-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-unknown-linux-android21"

%struct.MarshalMethodName = type {
	i64, ; uint64_t id
	ptr ; char* name
}

%struct.MarshalMethodsManagedClass = type {
	i32, ; uint32_t token
	ptr ; MonoClass klass
}

@assembly_image_cache = dso_local local_unnamed_addr global [334 x ptr] zeroinitializer, align 16

; Each entry maps hash of an assembly name to an index into the `assembly_image_cache` array
@assembly_image_cache_hashes = dso_local local_unnamed_addr constant [1002 x i64] [
	i64 u0x001e58127c546039, ; 0: lib_System.Globalization.dll.so => 41
	i64 u0x0024d0f62dee05bd, ; 1: Xamarin.KotlinX.Coroutines.Core.dll => 288
	i64 u0x0071cf2d27b7d61e, ; 2: lib_Xamarin.AndroidX.SwipeRefreshLayout.dll.so => 264
	i64 u0x01109b0e4d99e61f, ; 3: System.ComponentModel.Annotations.dll => 13
	i64 u0x01af0bd6467d518e, ; 4: lib_ZXing.Net.MAUI.dll.so => 293
	i64 u0x02123411c4e01926, ; 5: lib_Xamarin.AndroidX.Navigation.Runtime.dll.so => 254
	i64 u0x022f31be406de945, ; 6: Microsoft.Extensions.Options.ConfigurationExtensions => 187
	i64 u0x0284512fad379f7e, ; 7: System.Runtime.Handles => 104
	i64 u0x02abedc11addc1ed, ; 8: lib_Mono.Android.Runtime.dll.so => 170
	i64 u0x02f55bf70672f5c8, ; 9: lib_System.IO.FileSystem.DriveInfo.dll.so => 47
	i64 u0x032267b2a94db371, ; 10: lib_Xamarin.AndroidX.AppCompat.dll.so => 204
	i64 u0x03621c804933a890, ; 11: System.Buffers => 7
	i64 u0x0399610510a38a38, ; 12: lib_System.Private.DataContractSerialization.dll.so => 85
	i64 u0x043032f1d071fae0, ; 13: ru/Microsoft.Maui.Controls.resources => 319
	i64 u0x044440a55165631e, ; 14: lib-cs-Microsoft.Maui.Controls.resources.dll.so => 297
	i64 u0x046eb1581a80c6b0, ; 15: vi/Microsoft.Maui.Controls.resources => 325
	i64 u0x047408741db2431a, ; 16: Xamarin.AndroidX.DynamicAnimation => 230
	i64 u0x0517ef04e06e9f76, ; 17: System.Net.Primitives => 70
	i64 u0x0565d18c6da3de38, ; 18: Xamarin.AndroidX.RecyclerView => 257
	i64 u0x0581db89237110e9, ; 19: lib_System.Collections.dll.so => 12
	i64 u0x05989cb940b225a9, ; 20: Microsoft.Maui.dll => 191
	i64 u0x05a1c25e78e22d87, ; 21: lib_System.Runtime.CompilerServices.Unsafe.dll.so => 101
	i64 u0x06076b5d2b581f08, ; 22: zh-HK/Microsoft.Maui.Controls.resources => 326
	i64 u0x06388ffe9f6c161a, ; 23: System.Xml.Linq.dll => 155
	i64 u0x06600c4c124cb358, ; 24: System.Configuration.dll => 19
	i64 u0x067f95c5ddab55b3, ; 25: lib_Xamarin.AndroidX.Fragment.Ktx.dll.so => 235
	i64 u0x0680a433c781bb3d, ; 26: Xamarin.AndroidX.Collection.Jvm => 216
	i64 u0x069fff96ec92a91d, ; 27: System.Xml.XPath.dll => 160
	i64 u0x070b0847e18dab68, ; 28: Xamarin.AndroidX.Emoji2.ViewsHelper.dll => 232
	i64 u0x0739448d84d3b016, ; 29: lib_Xamarin.AndroidX.VectorDrawable.dll.so => 268
	i64 u0x07469f2eecce9e85, ; 30: mscorlib.dll => 166
	i64 u0x07bbabb19a2cf848, ; 31: Qentry => 0
	i64 u0x07c57877c7ba78ad, ; 32: ru/Microsoft.Maui.Controls.resources.dll => 319
	i64 u0x07dcdc7460a0c5e4, ; 33: System.Collections.NonGeneric => 10
	i64 u0x08122e52765333c8, ; 34: lib_Microsoft.Extensions.Logging.Debug.dll.so => 185
	i64 u0x088610fc2509f69e, ; 35: lib_Xamarin.AndroidX.VectorDrawable.Animated.dll.so => 269
	i64 u0x08a7c865576bbde7, ; 36: System.Reflection.Primitives => 95
	i64 u0x08c9d051a4a817e5, ; 37: Xamarin.AndroidX.CustomView.PoolingContainer.dll => 228
	i64 u0x08f3c9788ee2153c, ; 38: Xamarin.AndroidX.DrawerLayout => 229
	i64 u0x09138715c92dba90, ; 39: lib_System.ComponentModel.Annotations.dll.so => 13
	i64 u0x0919c28b89381a0b, ; 40: lib_Microsoft.Extensions.Options.dll.so => 186
	i64 u0x092266563089ae3e, ; 41: lib_System.Collections.NonGeneric.dll.so => 10
	i64 u0x09d144a7e214d457, ; 42: System.Security.Cryptography => 126
	i64 u0x09e2b9f743db21a8, ; 43: lib_System.Reflection.Metadata.dll.so => 94
	i64 u0x0a832f2c97e71637, ; 44: Xamarin.AndroidX.Camera.Video => 212
	i64 u0x0abb3e2b271edc45, ; 45: System.Threading.Channels.dll => 139
	i64 u0x0b06b1feab070143, ; 46: System.Formats.Tar => 38
	i64 u0x0b3b632c3bbee20c, ; 47: sk/Microsoft.Maui.Controls.resources => 320
	i64 u0x0b6aff547b84fbe9, ; 48: Xamarin.KotlinX.Serialization.Core.Jvm => 291
	i64 u0x0b6d2cd03ef72f04, ; 49: Qentry.dll => 0
	i64 u0x0be2e1f8ce4064ed, ; 50: Xamarin.AndroidX.ViewPager => 271
	i64 u0x0c3ca6cc978e2aae, ; 51: pt-BR/Microsoft.Maui.Controls.resources => 316
	i64 u0x0c3d7adcdb333bf0, ; 52: Xamarin.AndroidX.Camera.Lifecycle => 211
	i64 u0x0c59ad9fbbd43abe, ; 53: Mono.Android => 171
	i64 u0x0c65741e86371ee3, ; 54: lib_Xamarin.Android.Glide.GifDecoder.dll.so => 198
	i64 u0x0c74af560004e816, ; 55: Microsoft.Win32.Registry.dll => 5
	i64 u0x0c7790f60165fc06, ; 56: lib_Microsoft.Maui.Essentials.dll.so => 192
	i64 u0x0c83c82812e96127, ; 57: lib_System.Net.Mail.dll.so => 66
	i64 u0x0cce4bce83380b7f, ; 58: Xamarin.AndroidX.Security.SecurityCrypto => 261
	i64 u0x0d13cd7cce4284e4, ; 59: System.Security.SecureString => 129
	i64 u0x0d63f4f73521c24f, ; 60: lib_Xamarin.AndroidX.SavedState.SavedState.Ktx.dll.so => 260
	i64 u0x0e04e702012f8463, ; 61: Xamarin.AndroidX.Emoji2 => 231
	i64 u0x0e14e73a54dda68e, ; 62: lib_System.Net.NameResolution.dll.so => 67
	i64 u0x0f37dd7a62ae99af, ; 63: lib_Xamarin.AndroidX.Collection.Ktx.dll.so => 217
	i64 u0x0f5e7abaa7cf470a, ; 64: System.Net.HttpListener => 65
	i64 u0x1001f97bbe242e64, ; 65: System.IO.UnmanagedMemoryStream => 56
	i64 u0x102a31b45304b1da, ; 66: Xamarin.AndroidX.CustomView => 227
	i64 u0x1065c4cb554c3d75, ; 67: System.IO.IsolatedStorage.dll => 51
	i64 u0x10f6cfcbcf801616, ; 68: System.IO.Compression.Brotli => 42
	i64 u0x114443cdcf2091f1, ; 69: System.Security.Cryptography.Primitives => 124
	i64 u0x118d570f508803d1, ; 70: Xamarin.AndroidX.Camera.Camera2.dll => 209
	i64 u0x11a603952763e1d4, ; 71: System.Net.Mail => 66
	i64 u0x11a70d0e1009fb11, ; 72: System.Net.WebSockets.dll => 80
	i64 u0x11f26371eee0d3c1, ; 73: lib_Xamarin.AndroidX.Lifecycle.Runtime.Ktx.dll.so => 245
	i64 u0x11fbe62d469cc1c8, ; 74: Microsoft.VisualStudio.DesignTools.TapContract.dll => 331
	i64 u0x12128b3f59302d47, ; 75: lib_System.Xml.Serialization.dll.so => 157
	i64 u0x123639456fb056da, ; 76: System.Reflection.Emit.Lightweight.dll => 91
	i64 u0x12521e9764603eaa, ; 77: lib_System.Resources.Reader.dll.so => 98
	i64 u0x125b7f94acb989db, ; 78: Xamarin.AndroidX.RecyclerView.dll => 257
	i64 u0x12d3b63863d4ab0b, ; 79: lib_System.Threading.Overlapped.dll.so => 140
	i64 u0x134eab1061c395ee, ; 80: System.Transactions => 150
	i64 u0x138567fa954faa55, ; 81: Xamarin.AndroidX.Browser => 208
	i64 u0x13a01de0cbc3f06c, ; 82: lib-fr-Microsoft.Maui.Controls.resources.dll.so => 303
	i64 u0x13beedefb0e28a45, ; 83: lib_System.Xml.XmlDocument.dll.so => 161
	i64 u0x13f1e5e209e91af4, ; 84: lib_Java.Interop.dll.so => 168
	i64 u0x13f1e880c25d96d1, ; 85: he/Microsoft.Maui.Controls.resources => 304
	i64 u0x143d8ea60a6a4011, ; 86: Microsoft.Extensions.DependencyInjection.Abstractions => 179
	i64 u0x1497051b917530bd, ; 87: lib_System.Net.WebSockets.dll.so => 80
	i64 u0x14b78ce3adce0011, ; 88: Microsoft.VisualStudio.DesignTools.TapContract => 331
	i64 u0x14d612a531c79c05, ; 89: Xamarin.JSpecify.dll => 283
	i64 u0x14e68447938213b7, ; 90: Xamarin.AndroidX.Collection.Ktx.dll => 217
	i64 u0x152a448bd1e745a7, ; 91: Microsoft.Win32.Primitives => 4
	i64 u0x1557de0138c445f4, ; 92: lib_Microsoft.Win32.Registry.dll.so => 5
	i64 u0x15bdc156ed462f2f, ; 93: lib_System.IO.FileSystem.dll.so => 50
	i64 u0x15e300c2c1668655, ; 94: System.Resources.Writer.dll => 100
	i64 u0x16bf2a22df043a09, ; 95: System.IO.Pipes.dll => 55
	i64 u0x16ea2b318ad2d830, ; 96: System.Security.Cryptography.Algorithms => 119
	i64 u0x16eeae54c7ebcc08, ; 97: System.Reflection.dll => 97
	i64 u0x17125c9a85b4929f, ; 98: lib_netstandard.dll.so => 167
	i64 u0x1716866f7416792e, ; 99: lib_System.Security.AccessControl.dll.so => 117
	i64 u0x174f71c46216e44a, ; 100: Xamarin.KotlinX.Coroutines.Core => 288
	i64 u0x1752c12f1e1fc00c, ; 101: System.Core => 21
	i64 u0x17b56e25558a5d36, ; 102: lib-hu-Microsoft.Maui.Controls.resources.dll.so => 307
	i64 u0x17f9358913beb16a, ; 103: System.Text.Encodings.Web => 136
	i64 u0x1809fb23f29ba44a, ; 104: lib_System.Reflection.TypeExtensions.dll.so => 96
	i64 u0x18402a709e357f3b, ; 105: lib_Xamarin.KotlinX.Serialization.Core.Jvm.dll.so => 291
	i64 u0x18a9befae51bb361, ; 106: System.Net.WebClient => 76
	i64 u0x18f0ce884e87d89a, ; 107: nb/Microsoft.Maui.Controls.resources.dll => 313
	i64 u0x19777fba3c41b398, ; 108: Xamarin.AndroidX.Startup.StartupRuntime.dll => 263
	i64 u0x19a4c090f14ebb66, ; 109: System.Security.Claims => 118
	i64 u0x1a040febb58bf51e, ; 110: lib_Xamarin.AndroidX.Camera.View.dll.so => 213
	i64 u0x1a91866a319e9259, ; 111: lib_System.Collections.Concurrent.dll.so => 8
	i64 u0x1aac34d1917ba5d3, ; 112: lib_System.dll.so => 164
	i64 u0x1aad60783ffa3e5b, ; 113: lib-th-Microsoft.Maui.Controls.resources.dll.so => 322
	i64 u0x1aea8f1c3b282172, ; 114: lib_System.Net.Ping.dll.so => 69
	i64 u0x1b4b7a1d0d265fa2, ; 115: Xamarin.Android.Glide.DiskLruCache => 197
	i64 u0x1bbdb16cfa73e785, ; 116: Xamarin.AndroidX.Lifecycle.Runtime.Ktx.Android => 246
	i64 u0x1bc766e07b2b4241, ; 117: Xamarin.AndroidX.ResourceInspection.Annotation.dll => 258
	i64 u0x1c292b1598348d77, ; 118: Microsoft.Extensions.Diagnostics.dll => 180
	i64 u0x1c753b5ff15bce1b, ; 119: Mono.Android.Runtime.dll => 170
	i64 u0x1cd47467799d8250, ; 120: System.Threading.Tasks.dll => 144
	i64 u0x1d23eafdc6dc346c, ; 121: System.Globalization.Calendars.dll => 39
	i64 u0x1da4110562816681, ; 122: Xamarin.AndroidX.Security.SecurityCrypto.dll => 261
	i64 u0x1db6820994506bf5, ; 123: System.IO.FileSystem.AccessControl.dll => 46
	i64 u0x1dbb0c2c6a999acb, ; 124: System.Diagnostics.StackTrace => 29
	i64 u0x1e3d87657e9659bc, ; 125: Xamarin.AndroidX.Navigation.UI => 255
	i64 u0x1e71143913d56c10, ; 126: lib-ko-Microsoft.Maui.Controls.resources.dll.so => 311
	i64 u0x1e7c31185e2fb266, ; 127: lib_System.Threading.Tasks.Parallel.dll.so => 143
	i64 u0x1ed8fcce5e9b50a0, ; 128: Microsoft.Extensions.Options.dll => 186
	i64 u0x1f055d15d807e1b2, ; 129: System.Xml.XmlSerializer => 162
	i64 u0x1f1ed22c1085f044, ; 130: lib_System.Diagnostics.FileVersionInfo.dll.so => 27
	i64 u0x1f61df9c5b94d2c1, ; 131: lib_System.Numerics.dll.so => 83
	i64 u0x1f750bb5421397de, ; 132: lib_Xamarin.AndroidX.Tracing.Tracing.dll.so => 265
	i64 u0x20237ea48006d7a8, ; 133: lib_System.Net.WebClient.dll.so => 76
	i64 u0x209375905fcc1bad, ; 134: lib_System.IO.Compression.Brotli.dll.so => 42
	i64 u0x20fab3cf2dfbc8df, ; 135: lib_System.Diagnostics.Process.dll.so => 28
	i64 u0x2110167c128cba15, ; 136: System.Globalization => 41
	i64 u0x21419508838f7547, ; 137: System.Runtime.CompilerServices.VisualC => 102
	i64 u0x2174319c0d835bc9, ; 138: System.Runtime => 116
	i64 u0x2198e5bc8b7153fa, ; 139: Xamarin.AndroidX.Annotation.Experimental.dll => 202
	i64 u0x219ea1b751a4dee4, ; 140: lib_System.IO.Compression.ZipFile.dll.so => 44
	i64 u0x21cc7e445dcd5469, ; 141: System.Reflection.Emit.ILGeneration => 90
	i64 u0x220fd4f2e7c48170, ; 142: th/Microsoft.Maui.Controls.resources => 322
	i64 u0x224538d85ed15a82, ; 143: System.IO.Pipes => 55
	i64 u0x22908438c6bed1af, ; 144: lib_System.Threading.Timer.dll.so => 147
	i64 u0x22fbc14e981e3b45, ; 145: lib_Microsoft.VisualStudio.DesignTools.MobileTapContracts.dll.so => 330
	i64 u0x237be844f1f812c7, ; 146: System.Threading.Thread.dll => 145
	i64 u0x23852b3bdc9f7096, ; 147: System.Resources.ResourceManager => 99
	i64 u0x23986dd7e5d4fc01, ; 148: System.IO.FileSystem.Primitives.dll => 48
	i64 u0x2407aef2bbe8fadf, ; 149: System.Console => 20
	i64 u0x240abe014b27e7d3, ; 150: Xamarin.AndroidX.Core.dll => 223
	i64 u0x247619fe4413f8bf, ; 151: System.Runtime.Serialization.Primitives.dll => 113
	i64 u0x24de8d301281575e, ; 152: Xamarin.Android.Glide => 195
	i64 u0x252073cc3caa62c2, ; 153: fr/Microsoft.Maui.Controls.resources.dll => 303
	i64 u0x256b8d41255f01b1, ; 154: Xamarin.Google.Crypto.Tink.Android => 278
	i64 u0x25e1850d10cdc8f7, ; 155: lib_Xamarin.AndroidX.Camera.Camera2.dll.so => 209
	i64 u0x2662c629b96b0b30, ; 156: lib_Xamarin.Kotlin.StdLib.dll.so => 284
	i64 u0x268c1439f13bcc29, ; 157: lib_Microsoft.Extensions.Primitives.dll.so => 188
	i64 u0x268f1dca6d06d437, ; 158: Xamarin.AndroidX.Camera.Core => 210
	i64 u0x26a670e154a9c54b, ; 159: System.Reflection.Extensions.dll => 93
	i64 u0x26d077d9678fe34f, ; 160: System.IO.dll => 57
	i64 u0x273f3515de5faf0d, ; 161: id/Microsoft.Maui.Controls.resources.dll => 308
	i64 u0x2742545f9094896d, ; 162: hr/Microsoft.Maui.Controls.resources => 306
	i64 u0x2759af78ab94d39b, ; 163: System.Net.WebSockets => 80
	i64 u0x27b2b16f3e9de038, ; 164: Xamarin.Google.Crypto.Tink.Android.dll => 278
	i64 u0x27b410442fad6cf1, ; 165: Java.Interop.dll => 168
	i64 u0x27b97e0d52c3034a, ; 166: System.Diagnostics.Debug => 26
	i64 u0x2801845a2c71fbfb, ; 167: System.Net.Primitives.dll => 70
	i64 u0x286835e259162700, ; 168: lib_Xamarin.AndroidX.ProfileInstaller.ProfileInstaller.dll.so => 256
	i64 u0x28e52865585a1ebe, ; 169: Microsoft.Extensions.Diagnostics.Abstractions.dll => 181
	i64 u0x2949f3617a02c6b2, ; 170: Xamarin.AndroidX.ExifInterface => 233
	i64 u0x29f947844fb7fc11, ; 171: Microsoft.Maui.Controls.HotReload.Forms => 329
	i64 u0x2a128783efe70ba0, ; 172: uk/Microsoft.Maui.Controls.resources.dll => 324
	i64 u0x2a3b095612184159, ; 173: lib_System.Net.NetworkInformation.dll.so => 68
	i64 u0x2a6507a5ffabdf28, ; 174: System.Diagnostics.TraceSource.dll => 32
	i64 u0x2ad156c8e1354139, ; 175: fi/Microsoft.Maui.Controls.resources => 302
	i64 u0x2ad5d6b13b7a3e04, ; 176: System.ComponentModel.DataAnnotations.dll => 14
	i64 u0x2af298f63581d886, ; 177: System.Text.RegularExpressions.dll => 138
	i64 u0x2afc1c4f898552ee, ; 178: lib_System.Formats.Asn1.dll.so => 37
	i64 u0x2b148910ed40fbf9, ; 179: zh-Hant/Microsoft.Maui.Controls.resources.dll => 328
	i64 u0x2b6989d78cba9a15, ; 180: Xamarin.AndroidX.Concurrent.Futures.dll => 218
	i64 u0x2c8bd14bb93a7d82, ; 181: lib-pl-Microsoft.Maui.Controls.resources.dll.so => 315
	i64 u0x2cbd9262ca785540, ; 182: lib_System.Text.Encoding.CodePages.dll.so => 133
	i64 u0x2cc9e1fed6257257, ; 183: lib_System.Reflection.Emit.Lightweight.dll.so => 91
	i64 u0x2cd723e9fe623c7c, ; 184: lib_System.Private.Xml.Linq.dll.so => 87
	i64 u0x2d169d318a968379, ; 185: System.Threading.dll => 148
	i64 u0x2d47774b7d993f59, ; 186: sv/Microsoft.Maui.Controls.resources.dll => 321
	i64 u0x2d5ffcae1ad0aaca, ; 187: System.Data.dll => 24
	i64 u0x2db915caf23548d2, ; 188: System.Text.Json.dll => 137
	i64 u0x2dcaa0bb15a4117a, ; 189: System.IO.UnmanagedMemoryStream.dll => 56
	i64 u0x2e5a40c319acb800, ; 190: System.IO.FileSystem => 50
	i64 u0x2e6f1f226821322a, ; 191: el/Microsoft.Maui.Controls.resources.dll => 300
	i64 u0x2f02f94df3200fe5, ; 192: System.Diagnostics.Process => 28
	i64 u0x2f2e98e1c89b1aff, ; 193: System.Xml.ReaderWriter => 156
	i64 u0x2f5911d9ba814e4e, ; 194: System.Diagnostics.Tracing => 33
	i64 u0x2f84070a459bc31f, ; 195: lib_System.Xml.dll.so => 163
	i64 u0x2ff49de6a71764a1, ; 196: lib_Microsoft.Extensions.Http.dll.so => 182
	i64 u0x309ee9eeec09a71e, ; 197: lib_Xamarin.AndroidX.Fragment.dll.so => 234
	i64 u0x30c6dda129408828, ; 198: System.IO.IsolatedStorage => 51
	i64 u0x31195fef5d8fb552, ; 199: _Microsoft.Android.Resource.Designer.dll => 333
	i64 u0x312c8ed623cbfc8d, ; 200: Xamarin.AndroidX.Window.dll => 273
	i64 u0x31496b779ed0663d, ; 201: lib_System.Reflection.DispatchProxy.dll.so => 89
	i64 u0x3156b7decbc904e6, ; 202: Xamarin.AndroidX.Tracing.Tracing.Ktx.dll => 266
	i64 u0x315f08d19390dc36, ; 203: Xamarin.Google.ErrorProne.TypeAnnotations => 280
	i64 u0x32243413e774362a, ; 204: Xamarin.AndroidX.CardView.dll => 214
	i64 u0x3235427f8d12dae1, ; 205: lib_System.Drawing.Primitives.dll.so => 34
	i64 u0x329753a17a517811, ; 206: fr/Microsoft.Maui.Controls.resources => 303
	i64 u0x32aa989ff07a84ff, ; 207: lib_System.Xml.ReaderWriter.dll.so => 156
	i64 u0x33829542f112d59b, ; 208: System.Collections.Immutable => 9
	i64 u0x33a31443733849fe, ; 209: lib-es-Microsoft.Maui.Controls.resources.dll.so => 301
	i64 u0x341abc357fbb4ebf, ; 210: lib_System.Net.Sockets.dll.so => 75
	i64 u0x3496c1e2dcaf5ecc, ; 211: lib_System.IO.Pipes.AccessControl.dll.so => 54
	i64 u0x34dfd74fe2afcf37, ; 212: Microsoft.Maui => 191
	i64 u0x34e292762d9615df, ; 213: cs/Microsoft.Maui.Controls.resources.dll => 297
	i64 u0x3508234247f48404, ; 214: Microsoft.Maui.Controls => 189
	i64 u0x353590da528c9d22, ; 215: System.ComponentModel.Annotations => 13
	i64 u0x3549870798b4cd30, ; 216: lib_Xamarin.AndroidX.ViewPager2.dll.so => 272
	i64 u0x355282fc1c909694, ; 217: Microsoft.Extensions.Configuration => 175
	i64 u0x3552fc5d578f0fbf, ; 218: Xamarin.AndroidX.Arch.Core.Common => 206
	i64 u0x355c649948d55d97, ; 219: lib_System.Runtime.Intrinsics.dll.so => 108
	i64 u0x35ea9d1c6834bc8c, ; 220: Xamarin.AndroidX.Lifecycle.ViewModel.Ktx.dll => 249
	i64 u0x3628ab68db23a01a, ; 221: lib_System.Diagnostics.Tools.dll.so => 31
	i64 u0x3673b042508f5b6b, ; 222: lib_System.Runtime.Extensions.dll.so => 103
	i64 u0x36740f1a8ecdc6c4, ; 223: System.Numerics => 83
	i64 u0x36b2b50fdf589ae2, ; 224: System.Reflection.Emit.Lightweight => 91
	i64 u0x36cada77dc79928b, ; 225: System.IO.MemoryMappedFiles => 52
	i64 u0x374ef46b06791af6, ; 226: System.Reflection.Primitives.dll => 95
	i64 u0x376bf93e521a5417, ; 227: lib_Xamarin.Jetbrains.Annotations.dll.so => 282
	i64 u0x37bc29f3183003b6, ; 228: lib_System.IO.dll.so => 57
	i64 u0x380134e03b1e160a, ; 229: System.Collections.Immutable.dll => 9
	i64 u0x38049b5c59b39324, ; 230: System.Runtime.CompilerServices.Unsafe => 101
	i64 u0x385c17636bb6fe6e, ; 231: Xamarin.AndroidX.CustomView.dll => 227
	i64 u0x38869c811d74050e, ; 232: System.Net.NameResolution.dll => 67
	i64 u0x393c226616977fdb, ; 233: lib_Xamarin.AndroidX.ViewPager.dll.so => 271
	i64 u0x395e37c3334cf82a, ; 234: lib-ca-Microsoft.Maui.Controls.resources.dll.so => 296
	i64 u0x3ab5859054645f72, ; 235: System.Security.Cryptography.Primitives.dll => 124
	i64 u0x3ad75090c3fac0e9, ; 236: lib_Xamarin.AndroidX.ResourceInspection.Annotation.dll.so => 258
	i64 u0x3ae44ac43a1fbdbb, ; 237: System.Runtime.Serialization => 115
	i64 u0x3b860f9932505633, ; 238: lib_System.Text.Encoding.Extensions.dll.so => 134
	i64 u0x3c3aafb6b3a00bf6, ; 239: lib_System.Security.Cryptography.X509Certificates.dll.so => 125
	i64 u0x3c4049146b59aa90, ; 240: System.Runtime.InteropServices.JavaScript => 105
	i64 u0x3c7c495f58ac5ee9, ; 241: Xamarin.Kotlin.StdLib => 284
	i64 u0x3c7e5ed3d5db71bb, ; 242: System.Security => 130
	i64 u0x3cd9d281d402eb9b, ; 243: Xamarin.AndroidX.Browser.dll => 208
	i64 u0x3ced6a4f3010aa96, ; 244: ZXing.Net.MAUI.Controls => 294
	i64 u0x3d1c50cc001a991e, ; 245: Xamarin.Google.Guava.ListenableFuture.dll => 281
	i64 u0x3d2b1913edfc08d7, ; 246: lib_System.Threading.ThreadPool.dll.so => 146
	i64 u0x3d46f0b995082740, ; 247: System.Xml.Linq => 155
	i64 u0x3d8a8f400514a790, ; 248: Xamarin.AndroidX.Fragment.Ktx.dll => 235
	i64 u0x3d9c2a242b040a50, ; 249: lib_Xamarin.AndroidX.Core.dll.so => 223
	i64 u0x3dbb6b9f5ab90fa7, ; 250: lib_Xamarin.AndroidX.DynamicAnimation.dll.so => 230
	i64 u0x3e5441657549b213, ; 251: Xamarin.AndroidX.ResourceInspection.Annotation => 258
	i64 u0x3e57d4d195c53c2e, ; 252: System.Reflection.TypeExtensions => 96
	i64 u0x3e616ab4ed1f3f15, ; 253: lib_System.Data.dll.so => 24
	i64 u0x3f1d226e6e06db7e, ; 254: Xamarin.AndroidX.SlidingPaneLayout.dll => 262
	i64 u0x3f510adf788828dd, ; 255: System.Threading.Tasks.Extensions => 142
	i64 u0x407a10bb4bf95829, ; 256: lib_Xamarin.AndroidX.Navigation.Common.dll.so => 252
	i64 u0x40c98b6bd77346d4, ; 257: Microsoft.VisualBasic.dll => 3
	i64 u0x41833cf766d27d96, ; 258: mscorlib => 166
	i64 u0x41cab042be111c34, ; 259: lib_Xamarin.AndroidX.AppCompat.AppCompatResources.dll.so => 205
	i64 u0x423a9ecc4d905a88, ; 260: lib_System.Resources.ResourceManager.dll.so => 99
	i64 u0x423bf51ae7def810, ; 261: System.Xml.XPath => 160
	i64 u0x42462ff15ddba223, ; 262: System.Resources.Reader.dll => 98
	i64 u0x4291015ff4e5ef71, ; 263: Xamarin.AndroidX.Core.ViewTree.dll => 225
	i64 u0x42a31b86e6ccc3f0, ; 264: System.Diagnostics.Contracts => 25
	i64 u0x430e95b891249788, ; 265: lib_System.Reflection.Emit.dll.so => 92
	i64 u0x43375950ec7c1b6a, ; 266: netstandard.dll => 167
	i64 u0x434c4e1d9284cdae, ; 267: Mono.Android.dll => 171
	i64 u0x43505013578652a0, ; 268: lib_Xamarin.AndroidX.Activity.Ktx.dll.so => 200
	i64 u0x437d06c381ed575a, ; 269: lib_Microsoft.VisualBasic.dll.so => 3
	i64 u0x43950f84de7cc79a, ; 270: pl/Microsoft.Maui.Controls.resources.dll => 315
	i64 u0x43e8ca5bc927ff37, ; 271: lib_Xamarin.AndroidX.Emoji2.ViewsHelper.dll.so => 232
	i64 u0x448bd33429269b19, ; 272: Microsoft.CSharp => 1
	i64 u0x4499fa3c8e494654, ; 273: lib_System.Runtime.Serialization.Primitives.dll.so => 113
	i64 u0x4515080865a951a5, ; 274: Xamarin.Kotlin.StdLib.dll => 284
	i64 u0x4545802489b736b9, ; 275: Xamarin.AndroidX.Fragment.Ktx => 235
	i64 u0x454b4d1e66bb783c, ; 276: Xamarin.AndroidX.Lifecycle.Process => 242
	i64 u0x45c40276a42e283e, ; 277: System.Diagnostics.TraceSource => 32
	i64 u0x45d443f2a29adc37, ; 278: System.AppContext.dll => 6
	i64 u0x46a4213bc97fe5ae, ; 279: lib-ru-Microsoft.Maui.Controls.resources.dll.so => 319
	i64 u0x47358bd471172e1d, ; 280: lib_System.Xml.Linq.dll.so => 155
	i64 u0x47daf4e1afbada10, ; 281: pt/Microsoft.Maui.Controls.resources => 317
	i64 u0x480c0a47dd42dd81, ; 282: lib_System.IO.MemoryMappedFiles.dll.so => 52
	i64 u0x49e952f19a4e2022, ; 283: System.ObjectModel => 84
	i64 u0x49f9e6948a8131e4, ; 284: lib_Xamarin.AndroidX.VersionedParcelable.dll.so => 270
	i64 u0x4a5667b2462a664b, ; 285: lib_Xamarin.AndroidX.Navigation.UI.dll.so => 255
	i64 u0x4a7a18981dbd56bc, ; 286: System.IO.Compression.FileSystem.dll => 43
	i64 u0x4aa5c60350917c06, ; 287: lib_Xamarin.AndroidX.Lifecycle.LiveData.Core.Ktx.dll.so => 241
	i64 u0x4b07a0ed0ab33ff4, ; 288: System.Runtime.Extensions.dll => 103
	i64 u0x4b576d47ac054f3c, ; 289: System.IO.FileSystem.AccessControl => 46
	i64 u0x4b7b6532ded934b7, ; 290: System.Text.Json => 137
	i64 u0x4c7755cf07ad2d5f, ; 291: System.Net.Http.Json.dll => 63
	i64 u0x4cc5f15266470798, ; 292: lib_Xamarin.AndroidX.Loader.dll.so => 251
	i64 u0x4cf6f67dc77aacd2, ; 293: System.Net.NetworkInformation.dll => 68
	i64 u0x4d3183dd245425d4, ; 294: System.Net.WebSockets.Client.dll => 79
	i64 u0x4d479f968a05e504, ; 295: System.Linq.Expressions.dll => 58
	i64 u0x4d55a010ffc4faff, ; 296: System.Private.Xml => 88
	i64 u0x4d5cbe77561c5b2e, ; 297: System.Web.dll => 153
	i64 u0x4d77512dbd86ee4c, ; 298: lib_Xamarin.AndroidX.Arch.Core.Common.dll.so => 206
	i64 u0x4d7793536e79c309, ; 299: System.ServiceProcess => 132
	i64 u0x4d95fccc1f67c7ca, ; 300: System.Runtime.Loader.dll => 109
	i64 u0x4dcf44c3c9b076a2, ; 301: it/Microsoft.Maui.Controls.resources.dll => 309
	i64 u0x4dd9247f1d2c3235, ; 302: Xamarin.AndroidX.Loader.dll => 251
	i64 u0x4e2aeee78e2c4a87, ; 303: Xamarin.AndroidX.ProfileInstaller.ProfileInstaller => 256
	i64 u0x4e32f00cb0937401, ; 304: Mono.Android.Runtime => 170
	i64 u0x4e5eea4668ac2b18, ; 305: System.Text.Encoding.CodePages => 133
	i64 u0x4ebd0c4b82c5eefc, ; 306: lib_System.Threading.Channels.dll.so => 139
	i64 u0x4ee8eaa9c9c1151a, ; 307: System.Globalization.Calendars => 39
	i64 u0x4f21ee6ef9eb527e, ; 308: ca/Microsoft.Maui.Controls.resources => 296
	i64 u0x4fdc964ec1888e25, ; 309: lib_Microsoft.Extensions.Configuration.Binder.dll.so => 177
	i64 u0x5037f0be3c28c7a3, ; 310: lib_Microsoft.Maui.Controls.dll.so => 189
	i64 u0x506203448c473a65, ; 311: Xamarin.Google.AutoValue.Annotations => 276
	i64 u0x50c3a29b21050d45, ; 312: System.Linq.Parallel.dll => 59
	i64 u0x5112ed116d87baf8, ; 313: CommunityToolkit.Mvvm => 173
	i64 u0x5116b21580ae6eb0, ; 314: Microsoft.Extensions.Configuration.Binder.dll => 177
	i64 u0x5131bbe80989093f, ; 315: Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll => 248
	i64 u0x516324a5050a7e3c, ; 316: System.Net.WebProxy => 78
	i64 u0x516d6f0b21a303de, ; 317: lib_System.Diagnostics.Contracts.dll.so => 25
	i64 u0x51bb8a2afe774e32, ; 318: System.Drawing => 35
	i64 u0x5247c5c32a4140f0, ; 319: System.Resources.Reader => 98
	i64 u0x526bb15e3c386364, ; 320: Xamarin.AndroidX.Lifecycle.Runtime.Ktx.dll => 245
	i64 u0x526ce79eb8e90527, ; 321: lib_System.Net.Primitives.dll.so => 70
	i64 u0x52829f00b4467c38, ; 322: lib_System.Data.Common.dll.so => 22
	i64 u0x529ffe06f39ab8db, ; 323: Xamarin.AndroidX.Core => 223
	i64 u0x52ff996554dbf352, ; 324: Microsoft.Maui.Graphics => 193
	i64 u0x535f7e40e8fef8af, ; 325: lib-sk-Microsoft.Maui.Controls.resources.dll.so => 320
	i64 u0x53978aac584c666e, ; 326: lib_System.Security.Cryptography.Cng.dll.so => 120
	i64 u0x53a96d5c86c9e194, ; 327: System.Net.NetworkInformation => 68
	i64 u0x53be1038a61e8d44, ; 328: System.Runtime.InteropServices.RuntimeInformation.dll => 106
	i64 u0x53c3014b9437e684, ; 329: lib-zh-HK-Microsoft.Maui.Controls.resources.dll.so => 326
	i64 u0x5435e6f049e9bc37, ; 330: System.Security.Claims.dll => 118
	i64 u0x54795225dd1587af, ; 331: lib_System.Runtime.dll.so => 116
	i64 u0x547a34f14e5f6210, ; 332: Xamarin.AndroidX.Lifecycle.Common.dll => 237
	i64 u0x556e8b63b660ab8b, ; 333: Xamarin.AndroidX.Lifecycle.Common.Jvm.dll => 238
	i64 u0x5588627c9a108ec9, ; 334: System.Collections.Specialized => 11
	i64 u0x55a898e4f42e3fae, ; 335: Microsoft.VisualBasic.Core.dll => 2
	i64 u0x55fa0c610fe93bb1, ; 336: lib_System.Security.Cryptography.OpenSsl.dll.so => 123
	i64 u0x56442b99bc64bb47, ; 337: System.Runtime.Serialization.Xml.dll => 114
	i64 u0x56a8b26e1aeae27b, ; 338: System.Threading.Tasks.Dataflow => 141
	i64 u0x56f932d61e93c07f, ; 339: System.Globalization.Extensions => 40
	i64 u0x571c5cfbec5ae8e2, ; 340: System.Private.Uri => 86
	i64 u0x576499c9f52fea31, ; 341: Xamarin.AndroidX.Annotation => 201
	i64 u0x579a06fed6eec900, ; 342: System.Private.CoreLib.dll => 172
	i64 u0x57c542c14049b66d, ; 343: System.Diagnostics.DiagnosticSource => 194
	i64 u0x581a8bd5cfda563e, ; 344: System.Threading.Timer => 147
	i64 u0x584ac38e21d2fde1, ; 345: Microsoft.Extensions.Configuration.Binder => 177
	i64 u0x58601b2dda4a27b9, ; 346: lib-ja-Microsoft.Maui.Controls.resources.dll.so => 310
	i64 u0x58688d9af496b168, ; 347: Microsoft.Extensions.DependencyInjection.dll => 178
	i64 u0x588c167a79db6bfb, ; 348: lib_Xamarin.Google.ErrorProne.Annotations.dll.so => 279
	i64 u0x5906028ae5151104, ; 349: Xamarin.AndroidX.Activity.Ktx => 200
	i64 u0x595a356d23e8da9a, ; 350: lib_Microsoft.CSharp.dll.so => 1
	i64 u0x59f9e60b9475085f, ; 351: lib_Xamarin.AndroidX.Annotation.Experimental.dll.so => 202
	i64 u0x5a745f5101a75527, ; 352: lib_System.IO.Compression.FileSystem.dll.so => 43
	i64 u0x5a89a886ae30258d, ; 353: lib_Xamarin.AndroidX.CoordinatorLayout.dll.so => 222
	i64 u0x5a8f6699f4a1caa9, ; 354: lib_System.Threading.dll.so => 148
	i64 u0x5ae9cd33b15841bf, ; 355: System.ComponentModel => 18
	i64 u0x5b54391bdc6fcfe6, ; 356: System.Private.DataContractSerialization => 85
	i64 u0x5b5f0e240a06a2a2, ; 357: da/Microsoft.Maui.Controls.resources.dll => 298
	i64 u0x5b8109e8e14c5e3e, ; 358: System.Globalization.Extensions.dll => 40
	i64 u0x5bddd04d72a9e350, ; 359: Xamarin.AndroidX.Lifecycle.LiveData.Core.Ktx => 241
	i64 u0x5bdf16b09da116ab, ; 360: Xamarin.AndroidX.Collection => 215
	i64 u0x5c019d5266093159, ; 361: lib_Xamarin.AndroidX.Lifecycle.Runtime.Ktx.Android.dll.so => 246
	i64 u0x5c30a4a35f9cc8c4, ; 362: lib_System.Reflection.Extensions.dll.so => 93
	i64 u0x5c393624b8176517, ; 363: lib_Microsoft.Extensions.Logging.dll.so => 183
	i64 u0x5c53c29f5073b0c9, ; 364: System.Diagnostics.FileVersionInfo => 27
	i64 u0x5c87463c575c7616, ; 365: lib_System.Globalization.Extensions.dll.so => 40
	i64 u0x5d0a4a29b02d9d3c, ; 366: System.Net.WebHeaderCollection.dll => 77
	i64 u0x5d1b514fc45c92d4, ; 367: ZXing.Net.MAUI => 293
	i64 u0x5d40c9b15181641f, ; 368: lib_Xamarin.AndroidX.Emoji2.dll.so => 231
	i64 u0x5d6ca10d35e9485b, ; 369: lib_Xamarin.AndroidX.Concurrent.Futures.dll.so => 218
	i64 u0x5d7ec76c1c703055, ; 370: System.Threading.Tasks.Parallel => 143
	i64 u0x5db0cbbd1028510e, ; 371: lib_System.Runtime.InteropServices.dll.so => 107
	i64 u0x5db30905d3e5013b, ; 372: Xamarin.AndroidX.Collection.Jvm.dll => 216
	i64 u0x5e2e9b05cf3004ae, ; 373: lib_Qentry.dll.so => 0
	i64 u0x5e467bc8f09ad026, ; 374: System.Collections.Specialized.dll => 11
	i64 u0x5e5173b3208d97e7, ; 375: System.Runtime.Handles.dll => 104
	i64 u0x5ea92fdb19ec8c4c, ; 376: System.Text.Encodings.Web.dll => 136
	i64 u0x5eb8046dd40e9ac3, ; 377: System.ComponentModel.Primitives => 16
	i64 u0x5ec272d219c9aba4, ; 378: System.Security.Cryptography.Csp.dll => 121
	i64 u0x5eee1376d94c7f5e, ; 379: System.Net.HttpListener.dll => 65
	i64 u0x5f36ccf5c6a57e24, ; 380: System.Xml.ReaderWriter.dll => 156
	i64 u0x5f4294b9b63cb842, ; 381: System.Data.Common => 22
	i64 u0x5f9a2d823f664957, ; 382: lib-el-Microsoft.Maui.Controls.resources.dll.so => 300
	i64 u0x5fa6da9c3cd8142a, ; 383: lib_Xamarin.KotlinX.Serialization.Core.dll.so => 290
	i64 u0x5fac98e0b37a5b9d, ; 384: System.Runtime.CompilerServices.Unsafe.dll => 101
	i64 u0x609f4b7b63d802d4, ; 385: lib_Microsoft.Extensions.DependencyInjection.dll.so => 178
	i64 u0x60cd4e33d7e60134, ; 386: Xamarin.KotlinX.Coroutines.Core.Jvm => 289
	i64 u0x60f62d786afcf130, ; 387: System.Memory => 62
	i64 u0x61bb78c89f867353, ; 388: System.IO => 57
	i64 u0x61be8d1299194243, ; 389: Microsoft.Maui.Controls.Xaml => 190
	i64 u0x61d2cba29557038f, ; 390: de/Microsoft.Maui.Controls.resources => 299
	i64 u0x61d88f399afb2f45, ; 391: lib_System.Runtime.Loader.dll.so => 109
	i64 u0x622eef6f9e59068d, ; 392: System.Private.CoreLib => 172
	i64 u0x63cdbd66ac39bb46, ; 393: lib_Microsoft.VisualStudio.DesignTools.XamlTapContract.dll.so => 332
	i64 u0x63d5e3aa4ef9b931, ; 394: Xamarin.KotlinX.Coroutines.Android.dll => 287
	i64 u0x63f1f6883c1e23c2, ; 395: lib_System.Collections.Immutable.dll.so => 9
	i64 u0x6400f68068c1e9f1, ; 396: Xamarin.Google.Android.Material.dll => 275
	i64 u0x640e3b14dbd325c2, ; 397: System.Security.Cryptography.Algorithms.dll => 119
	i64 u0x64587004560099b9, ; 398: System.Reflection => 97
	i64 u0x64b1529a438a3c45, ; 399: lib_System.Runtime.Handles.dll.so => 104
	i64 u0x6565fba2cd8f235b, ; 400: Xamarin.AndroidX.Lifecycle.ViewModel.Ktx => 249
	i64 u0x65ecac39144dd3cc, ; 401: Microsoft.Maui.Controls.dll => 189
	i64 u0x65ece51227bfa724, ; 402: lib_System.Runtime.Numerics.dll.so => 110
	i64 u0x661722438787b57f, ; 403: Xamarin.AndroidX.Annotation.Jvm.dll => 203
	i64 u0x6679b2337ee6b22a, ; 404: lib_System.IO.FileSystem.Primitives.dll.so => 48
	i64 u0x6692e924eade1b29, ; 405: lib_System.Console.dll.so => 20
	i64 u0x66a4e5c6a3fb0bae, ; 406: lib_Xamarin.AndroidX.Lifecycle.ViewModel.Android.dll.so => 248
	i64 u0x66d13304ce1a3efa, ; 407: Xamarin.AndroidX.CursorAdapter => 226
	i64 u0x674303f65d8fad6f, ; 408: lib_System.Net.Quic.dll.so => 71
	i64 u0x6756ca4cad62e9d6, ; 409: lib_Xamarin.AndroidX.ConstraintLayout.Core.dll.so => 221
	i64 u0x67c0802770244408, ; 410: System.Windows.dll => 154
	i64 u0x68100b69286e27cd, ; 411: lib_System.Formats.Tar.dll.so => 38
	i64 u0x68558ec653afa616, ; 412: lib-da-Microsoft.Maui.Controls.resources.dll.so => 298
	i64 u0x6872ec7a2e36b1ac, ; 413: System.Drawing.Primitives.dll => 34
	i64 u0x68bb2c417aa9b61c, ; 414: Xamarin.KotlinX.AtomicFU.dll => 285
	i64 u0x68fbbbe2eb455198, ; 415: System.Formats.Asn1 => 37
	i64 u0x69063fc0ba8e6bdd, ; 416: he/Microsoft.Maui.Controls.resources.dll => 304
	i64 u0x69a3e26c76f6eec4, ; 417: Xamarin.AndroidX.Window.Extensions.Core.Core.dll => 274
	i64 u0x6a4d7577b2317255, ; 418: System.Runtime.InteropServices.dll => 107
	i64 u0x6ace3b74b15ee4a4, ; 419: nb/Microsoft.Maui.Controls.resources => 313
	i64 u0x6afcedb171067e2b, ; 420: System.Core.dll => 21
	i64 u0x6bef98e124147c24, ; 421: Xamarin.Jetbrains.Annotations => 282
	i64 u0x6ce874bff138ce2b, ; 422: Xamarin.AndroidX.Lifecycle.ViewModel.dll => 247
	i64 u0x6d12bfaa99c72b1f, ; 423: lib_Microsoft.Maui.Graphics.dll.so => 193
	i64 u0x6d70755158ca866e, ; 424: lib_System.ComponentModel.EventBasedAsync.dll.so => 15
	i64 u0x6d79993361e10ef2, ; 425: Microsoft.Extensions.Primitives => 188
	i64 u0x6d7eeca99577fc8b, ; 426: lib_System.Net.WebProxy.dll.so => 78
	i64 u0x6d8515b19946b6a2, ; 427: System.Net.WebProxy.dll => 78
	i64 u0x6d86d56b84c8eb71, ; 428: lib_Xamarin.AndroidX.CursorAdapter.dll.so => 226
	i64 u0x6d9bea6b3e895cf7, ; 429: Microsoft.Extensions.Primitives.dll => 188
	i64 u0x6e25a02c3833319a, ; 430: lib_Xamarin.AndroidX.Navigation.Fragment.dll.so => 253
	i64 u0x6e79c6bd8627412a, ; 431: Xamarin.AndroidX.SavedState.SavedState.Ktx => 260
	i64 u0x6e838d9a2a6f6c9e, ; 432: lib_System.ValueTuple.dll.so => 151
	i64 u0x6e9965ce1095e60a, ; 433: lib_System.Core.dll.so => 21
	i64 u0x6fd2265da78b93a4, ; 434: lib_Microsoft.Maui.dll.so => 191
	i64 u0x6fdfc7de82c33008, ; 435: cs/Microsoft.Maui.Controls.resources => 297
	i64 u0x6ffc4967cc47ba57, ; 436: System.IO.FileSystem.Watcher.dll => 49
	i64 u0x701cd46a1c25a5fe, ; 437: System.IO.FileSystem.dll => 50
	i64 u0x70e99f48c05cb921, ; 438: tr/Microsoft.Maui.Controls.resources.dll => 323
	i64 u0x70fd3deda22442d2, ; 439: lib-nb-Microsoft.Maui.Controls.resources.dll.so => 313
	i64 u0x71485e7ffdb4b958, ; 440: System.Reflection.Extensions => 93
	i64 u0x7162a2fce67a945f, ; 441: lib_Xamarin.Android.Glide.Annotations.dll.so => 196
	i64 u0x717530326f808838, ; 442: lib_Microsoft.Extensions.Diagnostics.Abstractions.dll.so => 181
	i64 u0x71a495ea3761dde8, ; 443: lib-it-Microsoft.Maui.Controls.resources.dll.so => 309
	i64 u0x71ad672adbe48f35, ; 444: System.ComponentModel.Primitives.dll => 16
	i64 u0x720f102581a4a5c8, ; 445: Xamarin.AndroidX.Core.ViewTree => 225
	i64 u0x725f5a9e82a45c81, ; 446: System.Security.Cryptography.Encoding => 122
	i64 u0x72b1fb4109e08d7b, ; 447: lib-hr-Microsoft.Maui.Controls.resources.dll.so => 306
	i64 u0x72e0300099accce1, ; 448: System.Xml.XPath.XDocument => 159
	i64 u0x730bfb248998f67a, ; 449: System.IO.Compression.ZipFile => 44
	i64 u0x732b2d67b9e5c47b, ; 450: Xamarin.Google.ErrorProne.Annotations.dll => 279
	i64 u0x734b76fdc0dc05bb, ; 451: lib_GoogleGson.dll.so => 174
	i64 u0x73a6be34e822f9d1, ; 452: lib_System.Runtime.Serialization.dll.so => 115
	i64 u0x73e4ce94e2eb6ffc, ; 453: lib_System.Memory.dll.so => 62
	i64 u0x743a1eccf080489a, ; 454: WindowsBase.dll => 165
	i64 u0x746cf89b511b4d40, ; 455: lib_Microsoft.Extensions.Diagnostics.dll.so => 180
	i64 u0x755a91767330b3d4, ; 456: lib_Microsoft.Extensions.Configuration.dll.so => 175
	i64 u0x75c326eb821b85c4, ; 457: lib_System.ComponentModel.DataAnnotations.dll.so => 14
	i64 u0x76012e7334db86e5, ; 458: lib_Xamarin.AndroidX.SavedState.dll.so => 259
	i64 u0x76ca07b878f44da0, ; 459: System.Runtime.Numerics.dll => 110
	i64 u0x7736c8a96e51a061, ; 460: lib_Xamarin.AndroidX.Annotation.Jvm.dll.so => 203
	i64 u0x778a805e625329ef, ; 461: System.Linq.Parallel => 59
	i64 u0x779290cc2b801eb7, ; 462: Xamarin.KotlinX.AtomicFU.Jvm => 286
	i64 u0x77bf40592cd67602, ; 463: Xamarin.Google.AutoValue.Annotations.dll => 276
	i64 u0x77f8a4acc2fdc449, ; 464: System.Security.Cryptography.Cng.dll => 120
	i64 u0x780bc73597a503a9, ; 465: lib-ms-Microsoft.Maui.Controls.resources.dll.so => 312
	i64 u0x782c5d8eb99ff201, ; 466: lib_Microsoft.VisualBasic.Core.dll.so => 2
	i64 u0x783606d1e53e7a1a, ; 467: th/Microsoft.Maui.Controls.resources.dll => 322
	i64 u0x78a45e51311409b6, ; 468: Xamarin.AndroidX.Fragment.dll => 234
	i64 u0x78ed4ab8f9d800a1, ; 469: Xamarin.AndroidX.Lifecycle.ViewModel => 247
	i64 u0x7a25bdb29108c6e7, ; 470: Microsoft.Extensions.Http => 182
	i64 u0x7a39601d6f0bb831, ; 471: lib_Xamarin.KotlinX.AtomicFU.dll.so => 285
	i64 u0x7a5207a7c82d30b4, ; 472: lib_Xamarin.JSpecify.dll.so => 283
	i64 u0x7a7e7eddf79c5d26, ; 473: lib_Xamarin.AndroidX.Lifecycle.ViewModel.dll.so => 247
	i64 u0x7a9a57d43b0845fa, ; 474: System.AppContext => 6
	i64 u0x7ad0f4f1e5d08183, ; 475: Xamarin.AndroidX.Collection.dll => 215
	i64 u0x7adb8da2ac89b647, ; 476: fi/Microsoft.Maui.Controls.resources.dll => 302
	i64 u0x7b13d9eaa944ade8, ; 477: Xamarin.AndroidX.DynamicAnimation.dll => 230
	i64 u0x7bef86a4335c4870, ; 478: System.ComponentModel.TypeConverter => 17
	i64 u0x7c0820144cd34d6a, ; 479: sk/Microsoft.Maui.Controls.resources.dll => 320
	i64 u0x7c2a0bd1e0f988fc, ; 480: lib-de-Microsoft.Maui.Controls.resources.dll.so => 299
	i64 u0x7c41d387501568ba, ; 481: System.Net.WebClient.dll => 76
	i64 u0x7c482cd79bd24b13, ; 482: lib_Xamarin.AndroidX.ConstraintLayout.dll.so => 220
	i64 u0x7c8cb8cf04bee12b, ; 483: lib_Xamarin.Google.AutoValue.Annotations.dll.so => 276
	i64 u0x7cd2ec8eaf5241cd, ; 484: System.Security.dll => 130
	i64 u0x7cf9ae50dd350622, ; 485: Xamarin.Jetbrains.Annotations.dll => 282
	i64 u0x7cfbc8d16d068e41, ; 486: lib_Xamarin.AndroidX.Tracing.Tracing.Ktx.dll.so => 266
	i64 u0x7d649b75d580bb42, ; 487: ms/Microsoft.Maui.Controls.resources.dll => 312
	i64 u0x7d8ee2bdc8e3aad1, ; 488: System.Numerics.Vectors => 82
	i64 u0x7df5df8db8eaa6ac, ; 489: Microsoft.Extensions.Logging.Debug => 185
	i64 u0x7dfc3d6d9d8d7b70, ; 490: System.Collections => 12
	i64 u0x7e2e564fa2f76c65, ; 491: lib_System.Diagnostics.Tracing.dll.so => 33
	i64 u0x7e302e110e1e1346, ; 492: lib_System.Security.Claims.dll.so => 118
	i64 u0x7e4465b3f78ad8d0, ; 493: Xamarin.KotlinX.Serialization.Core.dll => 290
	i64 u0x7e571cad5915e6c3, ; 494: lib_Xamarin.AndroidX.Lifecycle.Process.dll.so => 242
	i64 u0x7e6b1ca712437d7d, ; 495: Xamarin.AndroidX.Emoji2.ViewsHelper => 232
	i64 u0x7e946809d6008ef2, ; 496: lib_System.ObjectModel.dll.so => 84
	i64 u0x7ea0272c1b4a9635, ; 497: lib_Xamarin.Android.Glide.dll.so => 195
	i64 u0x7ecc13347c8fd849, ; 498: lib_System.ComponentModel.dll.so => 18
	i64 u0x7f00ddd9b9ca5a13, ; 499: Xamarin.AndroidX.ViewPager.dll => 271
	i64 u0x7f9351cd44b1273f, ; 500: Microsoft.Extensions.Configuration.Abstractions => 176
	i64 u0x7fa781c67c2cab04, ; 501: Xamarin.AndroidX.Concurrent.Futures.Ktx => 219
	i64 u0x7fbd557c99b3ce6f, ; 502: lib_Xamarin.AndroidX.Lifecycle.LiveData.Core.dll.so => 240
	i64 u0x8076a9a44a2ca331, ; 503: System.Net.Quic => 71
	i64 u0x80b7e726b0280681, ; 504: Microsoft.VisualStudio.DesignTools.MobileTapContracts => 330
	i64 u0x80da183a87731838, ; 505: System.Reflection.Metadata => 94
	i64 u0x812c069d5cdecc17, ; 506: System.dll => 164
	i64 u0x81381be520a60adb, ; 507: Xamarin.AndroidX.Interpolator.dll => 236
	i64 u0x81657cec2b31e8aa, ; 508: System.Net => 81
	i64 u0x81ab745f6c0f5ce6, ; 509: zh-Hant/Microsoft.Maui.Controls.resources => 328
	i64 u0x8277f2be6b5ce05f, ; 510: Xamarin.AndroidX.AppCompat => 204
	i64 u0x828f06563b30bc50, ; 511: lib_Xamarin.AndroidX.CardView.dll.so => 214
	i64 u0x82920a8d9194a019, ; 512: Xamarin.KotlinX.AtomicFU.Jvm.dll => 286
	i64 u0x82b399cb01b531c4, ; 513: lib_System.Web.dll.so => 153
	i64 u0x82df8f5532a10c59, ; 514: lib_System.Drawing.dll.so => 35
	i64 u0x82f0b6e911d13535, ; 515: lib_System.Transactions.dll.so => 150
	i64 u0x82f6403342e12049, ; 516: uk/Microsoft.Maui.Controls.resources => 324
	i64 u0x83c14ba66c8e2b8c, ; 517: zh-Hans/Microsoft.Maui.Controls.resources => 327
	i64 u0x844ac8f64fd78edc, ; 518: Xamarin.AndroidX.Camera.View.dll => 213
	i64 u0x846ce984efea52c7, ; 519: System.Threading.Tasks.Parallel.dll => 143
	i64 u0x84a193ebdfbe477d, ; 520: Xamarin.AndroidX.Tracing.Tracing.Ktx => 266
	i64 u0x84ae73148a4557d2, ; 521: lib_System.IO.Pipes.dll.so => 55
	i64 u0x84b01102c12a9232, ; 522: System.Runtime.Serialization.Json.dll => 112
	i64 u0x850c5ba0b57ce8e7, ; 523: lib_Xamarin.AndroidX.Collection.dll.so => 215
	i64 u0x851d02edd334b044, ; 524: Xamarin.AndroidX.VectorDrawable => 268
	i64 u0x85c919db62150978, ; 525: Xamarin.AndroidX.Transition.dll => 267
	i64 u0x8662aaeb94fef37f, ; 526: lib_System.Dynamic.Runtime.dll.so => 36
	i64 u0x86a909228dc7657b, ; 527: lib-zh-Hant-Microsoft.Maui.Controls.resources.dll.so => 328
	i64 u0x86b3e00c36b84509, ; 528: Microsoft.Extensions.Configuration.dll => 175
	i64 u0x86b62cb077ec4fd7, ; 529: System.Runtime.Serialization.Xml => 114
	i64 u0x8706ffb12bf3f53d, ; 530: Xamarin.AndroidX.Annotation.Experimental => 202
	i64 u0x872a5b14c18d328c, ; 531: System.ComponentModel.DataAnnotations => 14
	i64 u0x872fb9615bc2dff0, ; 532: Xamarin.Android.Glide.Annotations.dll => 196
	i64 u0x87c69b87d9283884, ; 533: lib_System.Threading.Thread.dll.so => 145
	i64 u0x87f6569b25707834, ; 534: System.IO.Compression.Brotli.dll => 42
	i64 u0x8842b3a5d2d3fb36, ; 535: Microsoft.Maui.Essentials => 192
	i64 u0x88926583efe7ee86, ; 536: Xamarin.AndroidX.Activity.Ktx.dll => 200
	i64 u0x88ba6bc4f7762b03, ; 537: lib_System.Reflection.dll.so => 97
	i64 u0x88bda98e0cffb7a9, ; 538: lib_Xamarin.KotlinX.Coroutines.Core.Jvm.dll.so => 289
	i64 u0x8930322c7bd8f768, ; 539: netstandard => 167
	i64 u0x897a606c9e39c75f, ; 540: lib_System.ComponentModel.Primitives.dll.so => 16
	i64 u0x89911a22005b92b7, ; 541: System.IO.FileSystem.DriveInfo.dll => 47
	i64 u0x89c5188089ec2cd5, ; 542: lib_System.Runtime.InteropServices.RuntimeInformation.dll.so => 106
	i64 u0x8a19e3dc71b34b2c, ; 543: System.Reflection.TypeExtensions.dll => 96
	i64 u0x8ad229ea26432ee2, ; 544: Xamarin.AndroidX.Loader => 251
	i64 u0x8b4ff5d0fdd5faa1, ; 545: lib_System.Diagnostics.DiagnosticSource.dll.so => 194
	i64 u0x8b541d476eb3774c, ; 546: System.Security.Principal.Windows => 127
	i64 u0x8b8d01333a96d0b5, ; 547: System.Diagnostics.Process.dll => 28
	i64 u0x8b9ceca7acae3451, ; 548: lib-he-Microsoft.Maui.Controls.resources.dll.so => 304
	i64 u0x8cb8f612b633affb, ; 549: Xamarin.AndroidX.SavedState.SavedState.Ktx.dll => 260
	i64 u0x8cdfdb4ce85fb925, ; 550: lib_System.Security.Principal.Windows.dll.so => 127
	i64 u0x8cdfe7b8f4caa426, ; 551: System.IO.Compression.FileSystem => 43
	i64 u0x8d0f420977c2c1c7, ; 552: Xamarin.AndroidX.CursorAdapter.dll => 226
	i64 u0x8d52f7ea2796c531, ; 553: Xamarin.AndroidX.Emoji2.dll => 231
	i64 u0x8d7b8ab4b3310ead, ; 554: System.Threading => 148
	i64 u0x8da188285aadfe8e, ; 555: System.Collections.Concurrent => 8
	i64 u0x8ed807bfe9858dfc, ; 556: Xamarin.AndroidX.Navigation.Common => 252
	i64 u0x8ee08b8194a30f48, ; 557: lib-hi-Microsoft.Maui.Controls.resources.dll.so => 305
	i64 u0x8ef7601039857a44, ; 558: lib-ro-Microsoft.Maui.Controls.resources.dll.so => 318
	i64 u0x8f32c6f611f6ffab, ; 559: pt/Microsoft.Maui.Controls.resources.dll => 317
	i64 u0x8f44b45eb046bbd1, ; 560: System.ServiceModel.Web.dll => 131
	i64 u0x8f8829d21c8985a4, ; 561: lib-pt-BR-Microsoft.Maui.Controls.resources.dll.so => 316
	i64 u0x8fbf5b0114c6dcef, ; 562: System.Globalization.dll => 41
	i64 u0x8fcc8c2a81f3d9e7, ; 563: Xamarin.KotlinX.Serialization.Core => 290
	i64 u0x90263f8448b8f572, ; 564: lib_System.Diagnostics.TraceSource.dll.so => 32
	i64 u0x903101b46fb73a04, ; 565: _Microsoft.Android.Resource.Designer => 333
	i64 u0x90393bd4865292f3, ; 566: lib_System.IO.Compression.dll.so => 45
	i64 u0x905e2b8e7ae91ae6, ; 567: System.Threading.Tasks.Extensions.dll => 142
	i64 u0x90634f86c5ebe2b5, ; 568: Xamarin.AndroidX.Lifecycle.ViewModel.Android => 248
	i64 u0x907b636704ad79ef, ; 569: lib_Microsoft.Maui.Controls.Xaml.dll.so => 190
	i64 u0x90e9efbfd68593e0, ; 570: lib_Xamarin.AndroidX.Lifecycle.LiveData.dll.so => 239
	i64 u0x91418dc638b29e68, ; 571: lib_Xamarin.AndroidX.CustomView.dll.so => 227
	i64 u0x9157bd523cd7ed36, ; 572: lib_System.Text.Json.dll.so => 137
	i64 u0x91a74f07b30d37e2, ; 573: System.Linq.dll => 61
	i64 u0x91cb86ea3b17111d, ; 574: System.ServiceModel.Web => 131
	i64 u0x91fa41a87223399f, ; 575: ca/Microsoft.Maui.Controls.resources.dll => 296
	i64 u0x92054e486c0c7ea7, ; 576: System.IO.FileSystem.DriveInfo => 47
	i64 u0x928614058c40c4cd, ; 577: lib_System.Xml.XPath.XDocument.dll.so => 159
	i64 u0x92b138fffca2b01e, ; 578: lib_Xamarin.AndroidX.Arch.Core.Runtime.dll.so => 207
	i64 u0x92dfc2bfc6c6a888, ; 579: Xamarin.AndroidX.Lifecycle.LiveData => 239
	i64 u0x933da2c779423d68, ; 580: Xamarin.Android.Glide.Annotations => 196
	i64 u0x9388aad9b7ae40ce, ; 581: lib_Xamarin.AndroidX.Lifecycle.Common.dll.so => 237
	i64 u0x93cfa73ab28d6e35, ; 582: ms/Microsoft.Maui.Controls.resources => 312
	i64 u0x941c00d21e5c0679, ; 583: lib_Xamarin.AndroidX.Transition.dll.so => 267
	i64 u0x944077d8ca3c6580, ; 584: System.IO.Compression.dll => 45
	i64 u0x948cffedc8ed7960, ; 585: System.Xml => 163
	i64 u0x94c8990839c4bdb1, ; 586: lib_Xamarin.AndroidX.Interpolator.dll.so => 236
	i64 u0x95c6b36f5f5d7039, ; 587: Xamarin.AndroidX.Camera.Camera2 => 209
	i64 u0x95d757769563d0d3, ; 588: Xamarin.AndroidX.Camera.Lifecycle.dll => 211
	i64 u0x967fc325e09bfa8c, ; 589: es/Microsoft.Maui.Controls.resources => 301
	i64 u0x9686161486d34b81, ; 590: lib_Xamarin.AndroidX.ExifInterface.dll.so => 233
	i64 u0x9732d8dbddea3d9a, ; 591: id/Microsoft.Maui.Controls.resources => 308
	i64 u0x978be80e5210d31b, ; 592: Microsoft.Maui.Graphics.dll => 193
	i64 u0x97b8c771ea3e4220, ; 593: System.ComponentModel.dll => 18
	i64 u0x97e144c9d3c6976e, ; 594: System.Collections.Concurrent.dll => 8
	i64 u0x984184e3c70d4419, ; 595: GoogleGson => 174
	i64 u0x9843944103683dd3, ; 596: Xamarin.AndroidX.Core.Core.Ktx => 224
	i64 u0x98d720cc4597562c, ; 597: System.Security.Cryptography.OpenSsl => 123
	i64 u0x99052c1297204af4, ; 598: lib_Xamarin.AndroidX.Camera.Core.dll.so => 210
	i64 u0x991d510397f92d9d, ; 599: System.Linq.Expressions => 58
	i64 u0x996ceeb8a3da3d67, ; 600: System.Threading.Overlapped.dll => 140
	i64 u0x999cb19e1a04ffd3, ; 601: CommunityToolkit.Mvvm.dll => 173
	i64 u0x99a00ca5270c6878, ; 602: Xamarin.AndroidX.Navigation.Runtime => 254
	i64 u0x99cdc6d1f2d3a72f, ; 603: ko/Microsoft.Maui.Controls.resources.dll => 311
	i64 u0x9a01b1da98b6ee10, ; 604: Xamarin.AndroidX.Lifecycle.Runtime.dll => 243
	i64 u0x9a5ccc274fd6e6ee, ; 605: Jsr305Binding.dll => 277
	i64 u0x9ae6940b11c02876, ; 606: lib_Xamarin.AndroidX.Window.dll.so => 273
	i64 u0x9b211a749105beac, ; 607: System.Transactions.Local => 149
	i64 u0x9b8734714671022d, ; 608: System.Threading.Tasks.Dataflow.dll => 141
	i64 u0x9bc6aea27fbf034f, ; 609: lib_Xamarin.KotlinX.Coroutines.Core.dll.so => 288
	i64 u0x9bd8cc74558ad4c7, ; 610: Xamarin.KotlinX.AtomicFU => 285
	i64 u0x9c244ac7cda32d26, ; 611: System.Security.Cryptography.X509Certificates.dll => 125
	i64 u0x9c465f280cf43733, ; 612: lib_Xamarin.KotlinX.Coroutines.Android.dll.so => 287
	i64 u0x9c8f6872beab6408, ; 613: System.Xml.XPath.XDocument.dll => 159
	i64 u0x9ce01cf91101ae23, ; 614: System.Xml.XmlDocument => 161
	i64 u0x9d128180c81d7ce6, ; 615: Xamarin.AndroidX.CustomView.PoolingContainer => 228
	i64 u0x9d5dbcf5a48583fe, ; 616: lib_Xamarin.AndroidX.Activity.dll.so => 199
	i64 u0x9d74dee1a7725f34, ; 617: Microsoft.Extensions.Configuration.Abstractions.dll => 176
	i64 u0x9e4534b6adaf6e84, ; 618: nl/Microsoft.Maui.Controls.resources => 314
	i64 u0x9e4b95dec42769f7, ; 619: System.Diagnostics.Debug.dll => 26
	i64 u0x9eaf1efdf6f7267e, ; 620: Xamarin.AndroidX.Navigation.Common.dll => 252
	i64 u0x9ef542cf1f78c506, ; 621: Xamarin.AndroidX.Lifecycle.LiveData.Core => 240
	i64 u0x9ff334e3cf272fd6, ; 622: lib_Xamarin.AndroidX.Camera.Lifecycle.dll.so => 211
	i64 u0xa00832eb975f56a8, ; 623: lib_System.Net.dll.so => 81
	i64 u0xa0ad78236b7b267f, ; 624: Xamarin.AndroidX.Window => 273
	i64 u0xa0d8259f4cc284ec, ; 625: lib_System.Security.Cryptography.dll.so => 126
	i64 u0xa0e17ca50c77a225, ; 626: lib_Xamarin.Google.Crypto.Tink.Android.dll.so => 278
	i64 u0xa0ff9b3e34d92f11, ; 627: lib_System.Resources.Writer.dll.so => 100
	i64 u0xa12fbfb4da97d9f3, ; 628: System.Threading.Timer.dll => 147
	i64 u0xa1440773ee9d341e, ; 629: Xamarin.Google.Android.Material => 275
	i64 u0xa1b9d7c27f47219f, ; 630: Xamarin.AndroidX.Navigation.UI.dll => 255
	i64 u0xa2572680829d2c7c, ; 631: System.IO.Pipelines.dll => 53
	i64 u0xa26597e57ee9c7f6, ; 632: System.Xml.XmlDocument.dll => 161
	i64 u0xa308401900e5bed3, ; 633: lib_mscorlib.dll.so => 166
	i64 u0xa395572e7da6c99d, ; 634: lib_System.Security.dll.so => 130
	i64 u0xa3e683f24b43af6f, ; 635: System.Dynamic.Runtime.dll => 36
	i64 u0xa4145becdee3dc4f, ; 636: Xamarin.AndroidX.VectorDrawable.Animated => 269
	i64 u0xa46aa1eaa214539b, ; 637: ko/Microsoft.Maui.Controls.resources => 311
	i64 u0xa4a372eecb9e4df0, ; 638: Microsoft.Extensions.Diagnostics => 180
	i64 u0xa4d20d2ff0563d26, ; 639: lib_CommunityToolkit.Mvvm.dll.so => 173
	i64 u0xa4edc8f2ceae241a, ; 640: System.Data.Common.dll => 22
	i64 u0xa5494f40f128ce6a, ; 641: System.Runtime.Serialization.Formatters.dll => 111
	i64 u0xa54b74df83dce92b, ; 642: System.Reflection.DispatchProxy => 89
	i64 u0xa5b7152421ed6d98, ; 643: lib_System.IO.FileSystem.Watcher.dll.so => 49
	i64 u0xa5c3844f17b822db, ; 644: lib_System.Linq.Parallel.dll.so => 59
	i64 u0xa5ce5c755bde8cb8, ; 645: lib_System.Security.Cryptography.Csp.dll.so => 121
	i64 u0xa5e599d1e0524750, ; 646: System.Numerics.Vectors.dll => 82
	i64 u0xa5f1ba49b85dd355, ; 647: System.Security.Cryptography.dll => 126
	i64 u0xa61975a5a37873ea, ; 648: lib_System.Xml.XmlSerializer.dll.so => 162
	i64 u0xa6593e21584384d2, ; 649: lib_Jsr305Binding.dll.so => 277
	i64 u0xa66cbee0130865f7, ; 650: lib_WindowsBase.dll.so => 165
	i64 u0xa67dbee13e1df9ca, ; 651: Xamarin.AndroidX.SavedState.dll => 259
	i64 u0xa684b098dd27b296, ; 652: lib_Xamarin.AndroidX.Security.SecurityCrypto.dll.so => 261
	i64 u0xa68a420042bb9b1f, ; 653: Xamarin.AndroidX.DrawerLayout.dll => 229
	i64 u0xa6d26156d1cacc7c, ; 654: Xamarin.Android.Glide.dll => 195
	i64 u0xa75386b5cb9595aa, ; 655: Xamarin.AndroidX.Lifecycle.Runtime.Android => 244
	i64 u0xa763fbb98df8d9fb, ; 656: lib_Microsoft.Win32.Primitives.dll.so => 4
	i64 u0xa78ce3745383236a, ; 657: Xamarin.AndroidX.Lifecycle.Common.Jvm => 238
	i64 u0xa7c31b56b4dc7b33, ; 658: hu/Microsoft.Maui.Controls.resources => 307
	i64 u0xa7eab29ed44b4e7a, ; 659: Mono.Android.Export => 169
	i64 u0xa8195217cbf017b7, ; 660: Microsoft.VisualBasic.Core => 2
	i64 u0xa859a95830f367ff, ; 661: lib_Xamarin.AndroidX.Lifecycle.ViewModel.Ktx.dll.so => 249
	i64 u0xa8b52f21e0dbe690, ; 662: System.Runtime.Serialization.dll => 115
	i64 u0xa8c84ce526c2b4bd, ; 663: Microsoft.VisualStudio.DesignTools.XamlTapContract.dll => 332
	i64 u0xa8ee4ed7de2efaee, ; 664: Xamarin.AndroidX.Annotation.dll => 201
	i64 u0xa95590e7c57438a4, ; 665: System.Configuration => 19
	i64 u0xaa2219c8e3449ff5, ; 666: Microsoft.Extensions.Logging.Abstractions => 184
	i64 u0xaa443ac34067eeef, ; 667: System.Private.Xml.dll => 88
	i64 u0xaa52de307ef5d1dd, ; 668: System.Net.Http => 64
	i64 u0xaa9a7b0214a5cc5c, ; 669: System.Diagnostics.StackTrace.dll => 29
	i64 u0xaaaf86367285a918, ; 670: Microsoft.Extensions.DependencyInjection.Abstractions.dll => 179
	i64 u0xaaf84bb3f052a265, ; 671: el/Microsoft.Maui.Controls.resources => 300
	i64 u0xab9af77b5b67a0b8, ; 672: Xamarin.AndroidX.ConstraintLayout.Core => 221
	i64 u0xab9c1b2687d86b0b, ; 673: lib_System.Linq.Expressions.dll.so => 58
	i64 u0xac2af3fa195a15ce, ; 674: System.Runtime.Numerics => 110
	i64 u0xac5376a2a538dc10, ; 675: Xamarin.AndroidX.Lifecycle.LiveData.Core.dll => 240
	i64 u0xac5acae88f60357e, ; 676: System.Diagnostics.Tools.dll => 31
	i64 u0xac79c7e46047ad98, ; 677: System.Security.Principal.Windows.dll => 127
	i64 u0xac98d31068e24591, ; 678: System.Xml.XDocument => 158
	i64 u0xacd46e002c3ccb97, ; 679: ro/Microsoft.Maui.Controls.resources => 318
	i64 u0xacdd9e4180d56dda, ; 680: Xamarin.AndroidX.Concurrent.Futures => 218
	i64 u0xacf42eea7ef9cd12, ; 681: System.Threading.Channels => 139
	i64 u0xad89c07347f1bad6, ; 682: nl/Microsoft.Maui.Controls.resources.dll => 314
	i64 u0xadbb53caf78a79d2, ; 683: System.Web.HttpUtility => 152
	i64 u0xadc90ab061a9e6e4, ; 684: System.ComponentModel.TypeConverter.dll => 17
	i64 u0xadca1b9030b9317e, ; 685: Xamarin.AndroidX.Collection.Ktx => 217
	i64 u0xadd8eda2edf396ad, ; 686: Xamarin.Android.Glide.GifDecoder => 198
	i64 u0xadf4cf30debbeb9a, ; 687: System.Net.ServicePoint.dll => 74
	i64 u0xadf511667bef3595, ; 688: System.Net.Security => 73
	i64 u0xae0aaa94fdcfce0f, ; 689: System.ComponentModel.EventBasedAsync.dll => 15
	i64 u0xae282bcd03739de7, ; 690: Java.Interop => 168
	i64 u0xae53579c90db1107, ; 691: System.ObjectModel.dll => 84
	i64 u0xaec7c0c7e2ed4575, ; 692: lib_Xamarin.KotlinX.AtomicFU.Jvm.dll.so => 286
	i64 u0xaf732d0b2193b8f5, ; 693: System.Security.Cryptography.OpenSsl.dll => 123
	i64 u0xafdb94dbccd9d11c, ; 694: Xamarin.AndroidX.Lifecycle.LiveData.dll => 239
	i64 u0xafe29f45095518e7, ; 695: lib_Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll.so => 250
	i64 u0xb03ae931fb25607e, ; 696: Xamarin.AndroidX.ConstraintLayout => 220
	i64 u0xb05cc42cd94c6d9d, ; 697: lib-sv-Microsoft.Maui.Controls.resources.dll.so => 321
	i64 u0xb0ac21bec8f428c5, ; 698: Xamarin.AndroidX.Lifecycle.Runtime.Ktx.Android.dll => 246
	i64 u0xb0bb43dc52ea59f9, ; 699: System.Diagnostics.Tracing.dll => 33
	i64 u0xb1dd05401aa8ee63, ; 700: System.Security.AccessControl => 117
	i64 u0xb220631954820169, ; 701: System.Text.RegularExpressions => 138
	i64 u0xb2376e1dbf8b4ed7, ; 702: System.Security.Cryptography.Csp => 121
	i64 u0xb2a1959fe95c5402, ; 703: lib_System.Runtime.InteropServices.JavaScript.dll.so => 105
	i64 u0xb2a3f67f3bf29fce, ; 704: da/Microsoft.Maui.Controls.resources => 298
	i64 u0xb3011a0a57f7ffb2, ; 705: Microsoft.VisualStudio.DesignTools.MobileTapContracts.dll => 330
	i64 u0xb3874072ee0ecf8c, ; 706: Xamarin.AndroidX.VectorDrawable.Animated.dll => 269
	i64 u0xb3f0a0fcda8d3ebc, ; 707: Xamarin.AndroidX.CardView => 214
	i64 u0xb46be1aa6d4fff93, ; 708: hi/Microsoft.Maui.Controls.resources => 305
	i64 u0xb477491be13109d8, ; 709: ar/Microsoft.Maui.Controls.resources => 295
	i64 u0xb4bd7015ecee9d86, ; 710: System.IO.Pipelines => 53
	i64 u0xb4c53d9749c5f226, ; 711: lib_System.IO.FileSystem.AccessControl.dll.so => 46
	i64 u0xb4ff710863453fda, ; 712: System.Diagnostics.FileVersionInfo.dll => 27
	i64 u0xb5c38bf497a4cfe2, ; 713: lib_System.Threading.Tasks.dll.so => 144
	i64 u0xb5c7fcdafbc67ee4, ; 714: Microsoft.Extensions.Logging.Abstractions.dll => 184
	i64 u0xb5ea31d5244c6626, ; 715: System.Threading.ThreadPool.dll => 146
	i64 u0xb7212c4683a94afe, ; 716: System.Drawing.Primitives => 34
	i64 u0xb7b7753d1f319409, ; 717: sv/Microsoft.Maui.Controls.resources => 321
	i64 u0xb81a2c6e0aee50fe, ; 718: lib_System.Private.CoreLib.dll.so => 172
	i64 u0xb872c26142d22aa9, ; 719: Microsoft.Extensions.Http.dll => 182
	i64 u0xb8b0a9b3dfbc5cb7, ; 720: Xamarin.AndroidX.Window.Extensions.Core.Core => 274
	i64 u0xb8c60af47c08d4da, ; 721: System.Net.ServicePoint => 74
	i64 u0xb8e68d20aad91196, ; 722: lib_System.Xml.XPath.dll.so => 160
	i64 u0xb9185c33a1643eed, ; 723: Microsoft.CSharp.dll => 1
	i64 u0xb9b8001adf4ed7cc, ; 724: lib_Xamarin.AndroidX.SlidingPaneLayout.dll.so => 262
	i64 u0xb9f64d3b230def68, ; 725: lib-pt-Microsoft.Maui.Controls.resources.dll.so => 317
	i64 u0xb9fc3c8a556e3691, ; 726: ja/Microsoft.Maui.Controls.resources => 310
	i64 u0xba4670aa94a2b3c6, ; 727: lib_System.Xml.XDocument.dll.so => 158
	i64 u0xba48785529705af9, ; 728: System.Collections.dll => 12
	i64 u0xba965b8c86359996, ; 729: lib_System.Windows.dll.so => 154
	i64 u0xbb286883bc35db36, ; 730: System.Transactions.dll => 150
	i64 u0xbb65706fde942ce3, ; 731: System.Net.Sockets => 75
	i64 u0xbb6dc0b35452c1a0, ; 732: ZXing.Net.MAUI.dll => 293
	i64 u0xbba28979413cad9e, ; 733: lib_System.Runtime.CompilerServices.VisualC.dll.so => 102
	i64 u0xbbd180354b67271a, ; 734: System.Runtime.Serialization.Formatters => 111
	i64 u0xbc260cdba33291a3, ; 735: Xamarin.AndroidX.Arch.Core.Common.dll => 206
	i64 u0xbd0e2c0d55246576, ; 736: System.Net.Http.dll => 64
	i64 u0xbd3fbd85b9e1cb29, ; 737: lib_System.Net.HttpListener.dll.so => 65
	i64 u0xbd437a2cdb333d0d, ; 738: Xamarin.AndroidX.ViewPager2 => 272
	i64 u0xbd4f572d2bd0a789, ; 739: System.IO.Compression.ZipFile.dll => 44
	i64 u0xbd5d0b88d3d647a5, ; 740: lib_Xamarin.AndroidX.Browser.dll.so => 208
	i64 u0xbd877b14d0b56392, ; 741: System.Runtime.Intrinsics.dll => 108
	i64 u0xbe08e3083025c53d, ; 742: ZXing.Net.MAUI.Controls.dll => 294
	i64 u0xbe532a80075c3dc8, ; 743: Xamarin.AndroidX.Camera.Core.dll => 210
	i64 u0xbe65a49036345cf4, ; 744: lib_System.Buffers.dll.so => 7
	i64 u0xbee38d4a88835966, ; 745: Xamarin.AndroidX.AppCompat.AppCompatResources => 205
	i64 u0xbef9919db45b4ca7, ; 746: System.IO.Pipes.AccessControl => 54
	i64 u0xbf0fa68611139208, ; 747: lib_Xamarin.AndroidX.Annotation.dll.so => 201
	i64 u0xbfc1e1fb3095f2b3, ; 748: lib_System.Net.Http.Json.dll.so => 63
	i64 u0xc040a4ab55817f58, ; 749: ar/Microsoft.Maui.Controls.resources.dll => 295
	i64 u0xc07cadab29efeba0, ; 750: Xamarin.AndroidX.Core.Core.Ktx.dll => 224
	i64 u0xc0d928351ab5ca77, ; 751: System.Console.dll => 20
	i64 u0xc0f5a221a9383aea, ; 752: System.Runtime.Intrinsics => 108
	i64 u0xc111030af54d7191, ; 753: System.Resources.Writer => 100
	i64 u0xc12b8b3afa48329c, ; 754: lib_System.Linq.dll.so => 61
	i64 u0xc183ca0b74453aa9, ; 755: lib_System.Threading.Tasks.Dataflow.dll.so => 141
	i64 u0xc1ff9ae3cdb6e1e6, ; 756: Xamarin.AndroidX.Activity.dll => 199
	i64 u0xc26c064effb1dea9, ; 757: System.Buffers.dll => 7
	i64 u0xc28c50f32f81cc73, ; 758: ja/Microsoft.Maui.Controls.resources.dll => 310
	i64 u0xc2902f6cf5452577, ; 759: lib_Mono.Android.Export.dll.so => 169
	i64 u0xc2a3bca55b573141, ; 760: System.IO.FileSystem.Watcher => 49
	i64 u0xc2bcfec99f69365e, ; 761: Xamarin.AndroidX.ViewPager2.dll => 272
	i64 u0xc30b52815b58ac2c, ; 762: lib_System.Runtime.Serialization.Xml.dll.so => 114
	i64 u0xc36d7d89c652f455, ; 763: System.Threading.Overlapped => 140
	i64 u0xc396b285e59e5493, ; 764: GoogleGson.dll => 174
	i64 u0xc3c86c1e5e12f03d, ; 765: WindowsBase => 165
	i64 u0xc3f0e03e56ce7b69, ; 766: zxing => 292
	i64 u0xc421b61fd853169d, ; 767: lib_System.Net.WebSockets.Client.dll.so => 79
	i64 u0xc463e077917aa21d, ; 768: System.Runtime.Serialization.Json => 112
	i64 u0xc4d3858ed4d08512, ; 769: Xamarin.AndroidX.Lifecycle.ViewModelSavedState.dll => 250
	i64 u0xc50fded0ded1418c, ; 770: lib_System.ComponentModel.TypeConverter.dll.so => 17
	i64 u0xc519125d6bc8fb11, ; 771: lib_System.Net.Requests.dll.so => 72
	i64 u0xc5293b19e4dc230e, ; 772: Xamarin.AndroidX.Navigation.Fragment => 253
	i64 u0xc5325b2fcb37446f, ; 773: lib_System.Private.Xml.dll.so => 88
	i64 u0xc535cb9a21385d9b, ; 774: lib_Xamarin.Android.Glide.DiskLruCache.dll.so => 197
	i64 u0xc5a0f4b95a699af7, ; 775: lib_System.Private.Uri.dll.so => 86
	i64 u0xc5cdcd5b6277579e, ; 776: lib_System.Security.Cryptography.Algorithms.dll.so => 119
	i64 u0xc5ec286825cb0bf4, ; 777: Xamarin.AndroidX.Tracing.Tracing => 265
	i64 u0xc6706bc8aa7fe265, ; 778: Xamarin.AndroidX.Annotation.Jvm => 203
	i64 u0xc7c01e7d7c93a110, ; 779: System.Text.Encoding.Extensions.dll => 134
	i64 u0xc7ce851898a4548e, ; 780: lib_System.Web.HttpUtility.dll.so => 152
	i64 u0xc809d4089d2556b2, ; 781: System.Runtime.InteropServices.JavaScript.dll => 105
	i64 u0xc858a28d9ee5a6c5, ; 782: lib_System.Collections.Specialized.dll.so => 11
	i64 u0xc87a188861588632, ; 783: Xamarin.AndroidX.Camera.Video.dll => 212
	i64 u0xc8ac7c6bf1c2ec51, ; 784: System.Reflection.DispatchProxy.dll => 89
	i64 u0xc9c62c8f354ac568, ; 785: lib_System.Diagnostics.TextWriterTraceListener.dll.so => 30
	i64 u0xca3a723e7342c5b6, ; 786: lib-tr-Microsoft.Maui.Controls.resources.dll.so => 323
	i64 u0xca5801070d9fccfb, ; 787: System.Text.Encoding => 135
	i64 u0xcab3493c70141c2d, ; 788: pl/Microsoft.Maui.Controls.resources => 315
	i64 u0xcab69b9a31439815, ; 789: lib_Xamarin.Google.ErrorProne.TypeAnnotations.dll.so => 280
	i64 u0xcacfddc9f7c6de76, ; 790: ro/Microsoft.Maui.Controls.resources.dll => 318
	i64 u0xcadbc92899a777f0, ; 791: Xamarin.AndroidX.Startup.StartupRuntime => 263
	i64 u0xcba1cb79f45292b5, ; 792: Xamarin.Android.Glide.GifDecoder.dll => 198
	i64 u0xcbb5f80c7293e696, ; 793: lib_System.Globalization.Calendars.dll.so => 39
	i64 u0xcbd4fdd9cef4a294, ; 794: lib__Microsoft.Android.Resource.Designer.dll.so => 333
	i64 u0xcc15da1e07bbd994, ; 795: Xamarin.AndroidX.SlidingPaneLayout => 262
	i64 u0xcc2876b32ef2794c, ; 796: lib_System.Text.RegularExpressions.dll.so => 138
	i64 u0xcc5c3bb714c4561e, ; 797: Xamarin.KotlinX.Coroutines.Core.Jvm.dll => 289
	i64 u0xcc76886e09b88260, ; 798: Xamarin.KotlinX.Serialization.Core.Jvm.dll => 291
	i64 u0xcc9fa2923aa1c9ef, ; 799: System.Diagnostics.Contracts.dll => 25
	i64 u0xccf25c4b634ccd3a, ; 800: zh-Hans/Microsoft.Maui.Controls.resources.dll => 327
	i64 u0xcd10a42808629144, ; 801: System.Net.Requests => 72
	i64 u0xcdca1b920e9f53ba, ; 802: Xamarin.AndroidX.Interpolator => 236
	i64 u0xcdd0c48b6937b21c, ; 803: Xamarin.AndroidX.SwipeRefreshLayout => 264
	i64 u0xcde1fa22dc303670, ; 804: Microsoft.VisualStudio.DesignTools.XamlTapContract => 332
	i64 u0xcf23d8093f3ceadf, ; 805: System.Diagnostics.DiagnosticSource.dll => 194
	i64 u0xcf5ff6b6b2c4c382, ; 806: System.Net.Mail.dll => 66
	i64 u0xcf8fc898f98b0d34, ; 807: System.Private.Xml.Linq => 87
	i64 u0xd04b5f59ed596e31, ; 808: System.Reflection.Metadata.dll => 94
	i64 u0xd063299fcfc0c93f, ; 809: lib_System.Runtime.Serialization.Json.dll.so => 112
	i64 u0xd0de8a113e976700, ; 810: System.Diagnostics.TextWriterTraceListener => 30
	i64 u0xd0fc33d5ae5d4cb8, ; 811: System.Runtime.Extensions => 103
	i64 u0xd1194e1d8a8de83c, ; 812: lib_Xamarin.AndroidX.Lifecycle.Common.Jvm.dll.so => 238
	i64 u0xd12beacdfc14f696, ; 813: System.Dynamic.Runtime => 36
	i64 u0xd16fd7fb9bbcd43e, ; 814: Microsoft.Extensions.Diagnostics.Abstractions => 181
	i64 u0xd198e7ce1b6a8344, ; 815: System.Net.Quic.dll => 71
	i64 u0xd3144156a3727ebe, ; 816: Xamarin.Google.Guava.ListenableFuture => 281
	i64 u0xd333d0af9e423810, ; 817: System.Runtime.InteropServices => 107
	i64 u0xd33a415cb4278969, ; 818: System.Security.Cryptography.Encoding.dll => 122
	i64 u0xd3426d966bb704f5, ; 819: Xamarin.AndroidX.AppCompat.AppCompatResources.dll => 205
	i64 u0xd3651b6fc3125825, ; 820: System.Private.Uri.dll => 86
	i64 u0xd373685349b1fe8b, ; 821: Microsoft.Extensions.Logging.dll => 183
	i64 u0xd3801faafafb7698, ; 822: System.Private.DataContractSerialization.dll => 85
	i64 u0xd3e4c8d6a2d5d470, ; 823: it/Microsoft.Maui.Controls.resources => 309
	i64 u0xd3edcc1f25459a50, ; 824: System.Reflection.Emit => 92
	i64 u0xd4645626dffec99d, ; 825: lib_Microsoft.Extensions.DependencyInjection.Abstractions.dll.so => 179
	i64 u0xd4fa0abb79079ea9, ; 826: System.Security.Principal.dll => 128
	i64 u0xd51e08cddf283b3c, ; 827: lib_Xamarin.AndroidX.Concurrent.Futures.Ktx.dll.so => 219
	i64 u0xd5507e11a2b2839f, ; 828: Xamarin.AndroidX.Lifecycle.ViewModelSavedState => 250
	i64 u0xd567f168deeeaf3c, ; 829: lib_zxing.dll.so => 292
	i64 u0xd5d04bef8478ea19, ; 830: Xamarin.AndroidX.Tracing.Tracing.dll => 265
	i64 u0xd60815f26a12e140, ; 831: Microsoft.Extensions.Logging.Debug.dll => 185
	i64 u0xd63b432ec9306914, ; 832: zxing.dll => 292
	i64 u0xd65786d27a4ad960, ; 833: lib_Microsoft.Maui.Controls.HotReload.Forms.dll.so => 329
	i64 u0xd6694f8359737e4e, ; 834: Xamarin.AndroidX.SavedState => 259
	i64 u0xd6949e129339eae5, ; 835: lib_Xamarin.AndroidX.Core.Core.Ktx.dll.so => 224
	i64 u0xd6d21782156bc35b, ; 836: Xamarin.AndroidX.SwipeRefreshLayout.dll => 264
	i64 u0xd6de019f6af72435, ; 837: Xamarin.AndroidX.ConstraintLayout.Core.dll => 221
	i64 u0xd6f697a581fc6fe3, ; 838: Xamarin.Google.ErrorProne.TypeAnnotations.dll => 280
	i64 u0xd70956d1e6deefb9, ; 839: Jsr305Binding => 277
	i64 u0xd72329819cbbbc44, ; 840: lib_Microsoft.Extensions.Configuration.Abstractions.dll.so => 176
	i64 u0xd72c760af136e863, ; 841: System.Xml.XmlSerializer.dll => 162
	i64 u0xd753f071e44c2a03, ; 842: lib_System.Security.SecureString.dll.so => 129
	i64 u0xd7b3764ada9d341d, ; 843: lib_Microsoft.Extensions.Logging.Abstractions.dll.so => 184
	i64 u0xd7f0088bc5ad71f2, ; 844: Xamarin.AndroidX.VersionedParcelable => 270
	i64 u0xd8fb25e28ae30a12, ; 845: Xamarin.AndroidX.ProfileInstaller.ProfileInstaller.dll => 256
	i64 u0xd9d04d95a2671e29, ; 846: lib_ZXing.Net.MAUI.Controls.dll.so => 294
	i64 u0xda1dfa4c534a9251, ; 847: Microsoft.Extensions.DependencyInjection => 178
	i64 u0xdad05a11827959a3, ; 848: System.Collections.NonGeneric.dll => 10
	i64 u0xdaefdfe71aa53cf9, ; 849: System.IO.FileSystem.Primitives => 48
	i64 u0xdb5383ab5865c007, ; 850: lib-vi-Microsoft.Maui.Controls.resources.dll.so => 325
	i64 u0xdb58816721c02a59, ; 851: lib_System.Reflection.Emit.ILGeneration.dll.so => 90
	i64 u0xdbeda89f832aa805, ; 852: vi/Microsoft.Maui.Controls.resources.dll => 325
	i64 u0xdbf2a779fbc3ac31, ; 853: System.Transactions.Local.dll => 149
	i64 u0xdbf9607a441b4505, ; 854: System.Linq => 61
	i64 u0xdbfc90157a0de9b0, ; 855: lib_System.Text.Encoding.dll.so => 135
	i64 u0xdc75032002d1a212, ; 856: lib_System.Transactions.Local.dll.so => 149
	i64 u0xdca8be7403f92d4f, ; 857: lib_System.Linq.Queryable.dll.so => 60
	i64 u0xdce2c53525640bf3, ; 858: Microsoft.Extensions.Logging => 183
	i64 u0xdd2b722d78ef5f43, ; 859: System.Runtime.dll => 116
	i64 u0xdd67031857c72f96, ; 860: lib_System.Text.Encodings.Web.dll.so => 136
	i64 u0xdd70765ad6162057, ; 861: Xamarin.JSpecify => 283
	i64 u0xdd92e229ad292030, ; 862: System.Numerics.dll => 83
	i64 u0xdde30e6b77aa6f6c, ; 863: lib-zh-Hans-Microsoft.Maui.Controls.resources.dll.so => 327
	i64 u0xde110ae80fa7c2e2, ; 864: System.Xml.XDocument.dll => 158
	i64 u0xde4726fcdf63a198, ; 865: Xamarin.AndroidX.Transition => 267
	i64 u0xde572c2b2fb32f93, ; 866: lib_System.Threading.Tasks.Extensions.dll.so => 142
	i64 u0xde8769ebda7d8647, ; 867: hr/Microsoft.Maui.Controls.resources.dll => 306
	i64 u0xdee075f3477ef6be, ; 868: Xamarin.AndroidX.ExifInterface.dll => 233
	i64 u0xdf4b773de8fb1540, ; 869: System.Net.dll => 81
	i64 u0xdfa254ebb4346068, ; 870: System.Net.Ping => 69
	i64 u0xe0142572c095a480, ; 871: Xamarin.AndroidX.AppCompat.dll => 204
	i64 u0xe021eaa401792a05, ; 872: System.Text.Encoding.dll => 135
	i64 u0xe02f89350ec78051, ; 873: Xamarin.AndroidX.CoordinatorLayout.dll => 222
	i64 u0xe0496b9d65ef5474, ; 874: Xamarin.Android.Glide.DiskLruCache.dll => 197
	i64 u0xe10b760bb1462e7a, ; 875: lib_System.Security.Cryptography.Primitives.dll.so => 124
	i64 u0xe1566bbdb759c5af, ; 876: Microsoft.Maui.Controls.HotReload.Forms.dll => 329
	i64 u0xe192a588d4410686, ; 877: lib_System.IO.Pipelines.dll.so => 53
	i64 u0xe1a08bd3fa539e0d, ; 878: System.Runtime.Loader => 109
	i64 u0xe1a77eb8831f7741, ; 879: System.Security.SecureString.dll => 129
	i64 u0xe1b52f9f816c70ef, ; 880: System.Private.Xml.Linq.dll => 87
	i64 u0xe1e199c8ab02e356, ; 881: System.Data.DataSetExtensions.dll => 23
	i64 u0xe1ecfdb7fff86067, ; 882: System.Net.Security.dll => 73
	i64 u0xe2252a80fe853de4, ; 883: lib_System.Security.Principal.dll.so => 128
	i64 u0xe22fa4c9c645db62, ; 884: System.Diagnostics.TextWriterTraceListener.dll => 30
	i64 u0xe2420585aeceb728, ; 885: System.Net.Requests.dll => 72
	i64 u0xe26692647e6bcb62, ; 886: Xamarin.AndroidX.Lifecycle.Runtime.Ktx => 245
	i64 u0xe29b73bc11392966, ; 887: lib-id-Microsoft.Maui.Controls.resources.dll.so => 308
	i64 u0xe2ad448dee50fbdf, ; 888: System.Xml.Serialization => 157
	i64 u0xe2d920f978f5d85c, ; 889: System.Data.DataSetExtensions => 23
	i64 u0xe2e426c7714fa0bc, ; 890: Microsoft.Win32.Primitives.dll => 4
	i64 u0xe332bacb3eb4a806, ; 891: Mono.Android.Export.dll => 169
	i64 u0xe3811d68d4fe8463, ; 892: pt-BR/Microsoft.Maui.Controls.resources.dll => 316
	i64 u0xe3b7cbae5ad66c75, ; 893: lib_System.Security.Cryptography.Encoding.dll.so => 122
	i64 u0xe4292b48f3224d5b, ; 894: lib_Xamarin.AndroidX.Core.ViewTree.dll.so => 225
	i64 u0xe494f7ced4ecd10a, ; 895: hu/Microsoft.Maui.Controls.resources.dll => 307
	i64 u0xe4a9b1e40d1e8917, ; 896: lib-fi-Microsoft.Maui.Controls.resources.dll.so => 302
	i64 u0xe4f74a0b5bf9703f, ; 897: System.Runtime.Serialization.Primitives => 113
	i64 u0xe5434e8a119ceb69, ; 898: lib_Mono.Android.dll.so => 171
	i64 u0xe55703b9ce5c038a, ; 899: System.Diagnostics.Tools => 31
	i64 u0xe57013c8afc270b5, ; 900: Microsoft.VisualBasic => 3
	i64 u0xe62913cc36bc07ec, ; 901: System.Xml.dll => 163
	i64 u0xe7bea09c4900a191, ; 902: Xamarin.AndroidX.VectorDrawable.dll => 268
	i64 u0xe7e03cc18dcdeb49, ; 903: lib_System.Diagnostics.StackTrace.dll.so => 29
	i64 u0xe7e147ff99a7a380, ; 904: lib_System.Configuration.dll.so => 19
	i64 u0xe8397cf3948e7cb7, ; 905: lib_Microsoft.Extensions.Options.ConfigurationExtensions.dll.so => 187
	i64 u0xe86b0df4ba9e5db8, ; 906: lib_Xamarin.AndroidX.Lifecycle.Runtime.Android.dll.so => 244
	i64 u0xe896622fe0902957, ; 907: System.Reflection.Emit.dll => 92
	i64 u0xe89a2a9ef110899b, ; 908: System.Drawing.dll => 35
	i64 u0xe8c5f8c100b5934b, ; 909: Microsoft.Win32.Registry => 5
	i64 u0xe957c3976986ab72, ; 910: lib_Xamarin.AndroidX.Window.Extensions.Core.Core.dll.so => 274
	i64 u0xe98163eb702ae5c5, ; 911: Xamarin.AndroidX.Arch.Core.Runtime => 207
	i64 u0xe994f23ba4c143e5, ; 912: Xamarin.KotlinX.Coroutines.Android => 287
	i64 u0xe9b9c8c0458fd92a, ; 913: System.Windows => 154
	i64 u0xe9d166d87a7f2bdb, ; 914: lib_Xamarin.AndroidX.Startup.StartupRuntime.dll.so => 263
	i64 u0xea5a4efc2ad81d1b, ; 915: Xamarin.Google.ErrorProne.Annotations => 279
	i64 u0xeb2313fe9d65b785, ; 916: Xamarin.AndroidX.ConstraintLayout.dll => 220
	i64 u0xed19c616b3fcb7eb, ; 917: Xamarin.AndroidX.VersionedParcelable.dll => 270
	i64 u0xed60c6fa891c051a, ; 918: lib_Microsoft.VisualStudio.DesignTools.TapContract.dll.so => 331
	i64 u0xedc4817167106c23, ; 919: System.Net.Sockets.dll => 75
	i64 u0xedc632067fb20ff3, ; 920: System.Memory.dll => 62
	i64 u0xedc8e4ca71a02a8b, ; 921: Xamarin.AndroidX.Navigation.Runtime.dll => 254
	i64 u0xee81f5b3f1c4f83b, ; 922: System.Threading.ThreadPool => 146
	i64 u0xeeb7ebb80150501b, ; 923: lib_Xamarin.AndroidX.Collection.Jvm.dll.so => 216
	i64 u0xeefc635595ef57f0, ; 924: System.Security.Cryptography.Cng => 120
	i64 u0xef03b1b5a04e9709, ; 925: System.Text.Encoding.CodePages.dll => 133
	i64 u0xef602c523fe2e87a, ; 926: lib_Xamarin.Google.Guava.ListenableFuture.dll.so => 281
	i64 u0xef72742e1bcca27a, ; 927: Microsoft.Maui.Essentials.dll => 192
	i64 u0xefd1e0c4e5c9b371, ; 928: System.Resources.ResourceManager.dll => 99
	i64 u0xefe8f8d5ed3c72ea, ; 929: System.Formats.Tar.dll => 38
	i64 u0xefec0b7fdc57ec42, ; 930: Xamarin.AndroidX.Activity => 199
	i64 u0xf00c29406ea45e19, ; 931: es/Microsoft.Maui.Controls.resources.dll => 301
	i64 u0xf09e47b6ae914f6e, ; 932: System.Net.NameResolution => 67
	i64 u0xf0ac2b489fed2e35, ; 933: lib_System.Diagnostics.Debug.dll.so => 26
	i64 u0xf0bb49dadd3a1fe1, ; 934: lib_System.Net.ServicePoint.dll.so => 74
	i64 u0xf0de2537ee19c6ca, ; 935: lib_System.Net.WebHeaderCollection.dll.so => 77
	i64 u0xf1138779fa181c68, ; 936: lib_Xamarin.AndroidX.Lifecycle.Runtime.dll.so => 243
	i64 u0xf11b621fc87b983f, ; 937: Microsoft.Maui.Controls.Xaml.dll => 190
	i64 u0xf161f4f3c3b7e62c, ; 938: System.Data => 24
	i64 u0xf16eb650d5a464bc, ; 939: System.ValueTuple => 151
	i64 u0xf1c4b4005493d871, ; 940: System.Formats.Asn1.dll => 37
	i64 u0xf238bd79489d3a96, ; 941: lib-nl-Microsoft.Maui.Controls.resources.dll.so => 314
	i64 u0xf2feea356ba760af, ; 942: Xamarin.AndroidX.Arch.Core.Runtime.dll => 207
	i64 u0xf300e085f8acd238, ; 943: lib_System.ServiceProcess.dll.so => 132
	i64 u0xf32a2fa88738a54c, ; 944: lib_Xamarin.AndroidX.Camera.Video.dll.so => 212
	i64 u0xf34e52b26e7e059d, ; 945: System.Runtime.CompilerServices.VisualC.dll => 102
	i64 u0xf37221fda4ef8830, ; 946: lib_Xamarin.Google.Android.Material.dll.so => 275
	i64 u0xf3ad9b8fb3eefd12, ; 947: lib_System.IO.UnmanagedMemoryStream.dll.so => 56
	i64 u0xf3ddfe05336abf29, ; 948: System => 164
	i64 u0xf408654b2a135055, ; 949: System.Reflection.Emit.ILGeneration.dll => 90
	i64 u0xf4103170a1de5bd0, ; 950: System.Linq.Queryable.dll => 60
	i64 u0xf42d20c23173d77c, ; 951: lib_System.ServiceModel.Web.dll.so => 131
	i64 u0xf4c1dd70a5496a17, ; 952: System.IO.Compression => 45
	i64 u0xf4ecf4b9afc64781, ; 953: System.ServiceProcess.dll => 132
	i64 u0xf4eeeaa566e9b970, ; 954: lib_Xamarin.AndroidX.CustomView.PoolingContainer.dll.so => 228
	i64 u0xf518f63ead11fcd1, ; 955: System.Threading.Tasks => 144
	i64 u0xf5fc7602fe27b333, ; 956: System.Net.WebHeaderCollection => 77
	i64 u0xf6077741019d7428, ; 957: Xamarin.AndroidX.CoordinatorLayout => 222
	i64 u0xf6742cbf457c450b, ; 958: Xamarin.AndroidX.Lifecycle.Runtime.Android.dll => 244
	i64 u0xf6f893f692f8cb43, ; 959: Microsoft.Extensions.Options.ConfigurationExtensions.dll => 187
	i64 u0xf70c0a7bf8ccf5af, ; 960: System.Web => 153
	i64 u0xf77b20923f07c667, ; 961: de/Microsoft.Maui.Controls.resources.dll => 299
	i64 u0xf7e2cac4c45067b3, ; 962: lib_System.Numerics.Vectors.dll.so => 82
	i64 u0xf7e74930e0e3d214, ; 963: zh-HK/Microsoft.Maui.Controls.resources.dll => 326
	i64 u0xf84773b5c81e3cef, ; 964: lib-uk-Microsoft.Maui.Controls.resources.dll.so => 324
	i64 u0xf8aac5ea82de1348, ; 965: System.Linq.Queryable => 60
	i64 u0xf8abd63acd77d37b, ; 966: Xamarin.AndroidX.Camera.View => 213
	i64 u0xf8b77539b362d3ba, ; 967: lib_System.Reflection.Primitives.dll.so => 95
	i64 u0xf8e045dc345b2ea3, ; 968: lib_Xamarin.AndroidX.RecyclerView.dll.so => 257
	i64 u0xf915dc29808193a1, ; 969: System.Web.HttpUtility.dll => 152
	i64 u0xf96c777a2a0686f4, ; 970: hi/Microsoft.Maui.Controls.resources.dll => 305
	i64 u0xf9be54c8bcf8ff3b, ; 971: System.Security.AccessControl.dll => 117
	i64 u0xf9eec5bb3a6aedc6, ; 972: Microsoft.Extensions.Options => 186
	i64 u0xfa0e82300e67f913, ; 973: lib_System.AppContext.dll.so => 6
	i64 u0xfa2fdb27e8a2c8e8, ; 974: System.ComponentModel.EventBasedAsync => 15
	i64 u0xfa3f278f288b0e84, ; 975: lib_System.Net.Security.dll.so => 73
	i64 u0xfa5ed7226d978949, ; 976: lib-ar-Microsoft.Maui.Controls.resources.dll.so => 295
	i64 u0xfa645d91e9fc4cba, ; 977: System.Threading.Thread => 145
	i64 u0xfab337a1ee4b5b7c, ; 978: Xamarin.AndroidX.Concurrent.Futures.Ktx.dll => 219
	i64 u0xfad4d2c770e827f9, ; 979: lib_System.IO.IsolatedStorage.dll.so => 51
	i64 u0xfb06dd2338e6f7c4, ; 980: System.Net.Ping.dll => 69
	i64 u0xfb087abe5365e3b7, ; 981: lib_System.Data.DataSetExtensions.dll.so => 23
	i64 u0xfb846e949baff5ea, ; 982: System.Xml.Serialization.dll => 157
	i64 u0xfbad3e4ce4b98145, ; 983: System.Security.Cryptography.X509Certificates => 125
	i64 u0xfbf0a31c9fc34bc4, ; 984: lib_System.Net.Http.dll.so => 64
	i64 u0xfc6b7527cc280b3f, ; 985: lib_System.Runtime.Serialization.Formatters.dll.so => 111
	i64 u0xfc719aec26adf9d9, ; 986: Xamarin.AndroidX.Navigation.Fragment.dll => 253
	i64 u0xfc82690c2fe2735c, ; 987: Xamarin.AndroidX.Lifecycle.Process.dll => 242
	i64 u0xfc93fc307d279893, ; 988: System.IO.Pipes.AccessControl.dll => 54
	i64 u0xfcd302092ada6328, ; 989: System.IO.MemoryMappedFiles.dll => 52
	i64 u0xfd22f00870e40ae0, ; 990: lib_Xamarin.AndroidX.DrawerLayout.dll.so => 229
	i64 u0xfd49b3c1a76e2748, ; 991: System.Runtime.InteropServices.RuntimeInformation => 106
	i64 u0xfd536c702f64dc47, ; 992: System.Text.Encoding.Extensions => 134
	i64 u0xfd583f7657b6a1cb, ; 993: Xamarin.AndroidX.Fragment => 234
	i64 u0xfd8dd91a2c26bd5d, ; 994: Xamarin.AndroidX.Lifecycle.Runtime => 243
	i64 u0xfda36abccf05cf5c, ; 995: System.Net.WebSockets.Client => 79
	i64 u0xfddbe9695626a7f5, ; 996: Xamarin.AndroidX.Lifecycle.Common => 237
	i64 u0xfeae9952cf03b8cb, ; 997: tr/Microsoft.Maui.Controls.resources => 323
	i64 u0xfebe1950717515f9, ; 998: Xamarin.AndroidX.Lifecycle.LiveData.Core.Ktx.dll => 241
	i64 u0xff270a55858bac8d, ; 999: System.Security.Principal => 128
	i64 u0xff9b54613e0d2cc8, ; 1000: System.Net.Http.Json => 63
	i64 u0xffdb7a971be4ec73 ; 1001: System.ValueTuple.dll => 151
], align 16

@assembly_image_cache_indices = dso_local local_unnamed_addr constant [1002 x i32] [
	i32 41, i32 288, i32 264, i32 13, i32 293, i32 254, i32 187, i32 104,
	i32 170, i32 47, i32 204, i32 7, i32 85, i32 319, i32 297, i32 325,
	i32 230, i32 70, i32 257, i32 12, i32 191, i32 101, i32 326, i32 155,
	i32 19, i32 235, i32 216, i32 160, i32 232, i32 268, i32 166, i32 0,
	i32 319, i32 10, i32 185, i32 269, i32 95, i32 228, i32 229, i32 13,
	i32 186, i32 10, i32 126, i32 94, i32 212, i32 139, i32 38, i32 320,
	i32 291, i32 0, i32 271, i32 316, i32 211, i32 171, i32 198, i32 5,
	i32 192, i32 66, i32 261, i32 129, i32 260, i32 231, i32 67, i32 217,
	i32 65, i32 56, i32 227, i32 51, i32 42, i32 124, i32 209, i32 66,
	i32 80, i32 245, i32 331, i32 157, i32 91, i32 98, i32 257, i32 140,
	i32 150, i32 208, i32 303, i32 161, i32 168, i32 304, i32 179, i32 80,
	i32 331, i32 283, i32 217, i32 4, i32 5, i32 50, i32 100, i32 55,
	i32 119, i32 97, i32 167, i32 117, i32 288, i32 21, i32 307, i32 136,
	i32 96, i32 291, i32 76, i32 313, i32 263, i32 118, i32 213, i32 8,
	i32 164, i32 322, i32 69, i32 197, i32 246, i32 258, i32 180, i32 170,
	i32 144, i32 39, i32 261, i32 46, i32 29, i32 255, i32 311, i32 143,
	i32 186, i32 162, i32 27, i32 83, i32 265, i32 76, i32 42, i32 28,
	i32 41, i32 102, i32 116, i32 202, i32 44, i32 90, i32 322, i32 55,
	i32 147, i32 330, i32 145, i32 99, i32 48, i32 20, i32 223, i32 113,
	i32 195, i32 303, i32 278, i32 209, i32 284, i32 188, i32 210, i32 93,
	i32 57, i32 308, i32 306, i32 80, i32 278, i32 168, i32 26, i32 70,
	i32 256, i32 181, i32 233, i32 329, i32 324, i32 68, i32 32, i32 302,
	i32 14, i32 138, i32 37, i32 328, i32 218, i32 315, i32 133, i32 91,
	i32 87, i32 148, i32 321, i32 24, i32 137, i32 56, i32 50, i32 300,
	i32 28, i32 156, i32 33, i32 163, i32 182, i32 234, i32 51, i32 333,
	i32 273, i32 89, i32 266, i32 280, i32 214, i32 34, i32 303, i32 156,
	i32 9, i32 301, i32 75, i32 54, i32 191, i32 297, i32 189, i32 13,
	i32 272, i32 175, i32 206, i32 108, i32 249, i32 31, i32 103, i32 83,
	i32 91, i32 52, i32 95, i32 282, i32 57, i32 9, i32 101, i32 227,
	i32 67, i32 271, i32 296, i32 124, i32 258, i32 115, i32 134, i32 125,
	i32 105, i32 284, i32 130, i32 208, i32 294, i32 281, i32 146, i32 155,
	i32 235, i32 223, i32 230, i32 258, i32 96, i32 24, i32 262, i32 142,
	i32 252, i32 3, i32 166, i32 205, i32 99, i32 160, i32 98, i32 225,
	i32 25, i32 92, i32 167, i32 171, i32 200, i32 3, i32 315, i32 232,
	i32 1, i32 113, i32 284, i32 235, i32 242, i32 32, i32 6, i32 319,
	i32 155, i32 317, i32 52, i32 84, i32 270, i32 255, i32 43, i32 241,
	i32 103, i32 46, i32 137, i32 63, i32 251, i32 68, i32 79, i32 58,
	i32 88, i32 153, i32 206, i32 132, i32 109, i32 309, i32 251, i32 256,
	i32 170, i32 133, i32 139, i32 39, i32 296, i32 177, i32 189, i32 276,
	i32 59, i32 173, i32 177, i32 248, i32 78, i32 25, i32 35, i32 98,
	i32 245, i32 70, i32 22, i32 223, i32 193, i32 320, i32 120, i32 68,
	i32 106, i32 326, i32 118, i32 116, i32 237, i32 238, i32 11, i32 2,
	i32 123, i32 114, i32 141, i32 40, i32 86, i32 201, i32 172, i32 194,
	i32 147, i32 177, i32 310, i32 178, i32 279, i32 200, i32 1, i32 202,
	i32 43, i32 222, i32 148, i32 18, i32 85, i32 298, i32 40, i32 241,
	i32 215, i32 246, i32 93, i32 183, i32 27, i32 40, i32 77, i32 293,
	i32 231, i32 218, i32 143, i32 107, i32 216, i32 0, i32 11, i32 104,
	i32 136, i32 16, i32 121, i32 65, i32 156, i32 22, i32 300, i32 290,
	i32 101, i32 178, i32 289, i32 62, i32 57, i32 190, i32 299, i32 109,
	i32 172, i32 332, i32 287, i32 9, i32 275, i32 119, i32 97, i32 104,
	i32 249, i32 189, i32 110, i32 203, i32 48, i32 20, i32 248, i32 226,
	i32 71, i32 221, i32 154, i32 38, i32 298, i32 34, i32 285, i32 37,
	i32 304, i32 274, i32 107, i32 313, i32 21, i32 282, i32 247, i32 193,
	i32 15, i32 188, i32 78, i32 78, i32 226, i32 188, i32 253, i32 260,
	i32 151, i32 21, i32 191, i32 297, i32 49, i32 50, i32 323, i32 313,
	i32 93, i32 196, i32 181, i32 309, i32 16, i32 225, i32 122, i32 306,
	i32 159, i32 44, i32 279, i32 174, i32 115, i32 62, i32 165, i32 180,
	i32 175, i32 14, i32 259, i32 110, i32 203, i32 59, i32 286, i32 276,
	i32 120, i32 312, i32 2, i32 322, i32 234, i32 247, i32 182, i32 285,
	i32 283, i32 247, i32 6, i32 215, i32 302, i32 230, i32 17, i32 320,
	i32 299, i32 76, i32 220, i32 276, i32 130, i32 282, i32 266, i32 312,
	i32 82, i32 185, i32 12, i32 33, i32 118, i32 290, i32 242, i32 232,
	i32 84, i32 195, i32 18, i32 271, i32 176, i32 219, i32 240, i32 71,
	i32 330, i32 94, i32 164, i32 236, i32 81, i32 328, i32 204, i32 214,
	i32 286, i32 153, i32 35, i32 150, i32 324, i32 327, i32 213, i32 143,
	i32 266, i32 55, i32 112, i32 215, i32 268, i32 267, i32 36, i32 328,
	i32 175, i32 114, i32 202, i32 14, i32 196, i32 145, i32 42, i32 192,
	i32 200, i32 97, i32 289, i32 167, i32 16, i32 47, i32 106, i32 96,
	i32 251, i32 194, i32 127, i32 28, i32 304, i32 260, i32 127, i32 43,
	i32 226, i32 231, i32 148, i32 8, i32 252, i32 305, i32 318, i32 317,
	i32 131, i32 316, i32 41, i32 290, i32 32, i32 333, i32 45, i32 142,
	i32 248, i32 190, i32 239, i32 227, i32 137, i32 61, i32 131, i32 296,
	i32 47, i32 159, i32 207, i32 239, i32 196, i32 237, i32 312, i32 267,
	i32 45, i32 163, i32 236, i32 209, i32 211, i32 301, i32 233, i32 308,
	i32 193, i32 18, i32 8, i32 174, i32 224, i32 123, i32 210, i32 58,
	i32 140, i32 173, i32 254, i32 311, i32 243, i32 277, i32 273, i32 149,
	i32 141, i32 288, i32 285, i32 125, i32 287, i32 159, i32 161, i32 228,
	i32 199, i32 176, i32 314, i32 26, i32 252, i32 240, i32 211, i32 81,
	i32 273, i32 126, i32 278, i32 100, i32 147, i32 275, i32 255, i32 53,
	i32 161, i32 166, i32 130, i32 36, i32 269, i32 311, i32 180, i32 173,
	i32 22, i32 111, i32 89, i32 49, i32 59, i32 121, i32 82, i32 126,
	i32 162, i32 277, i32 165, i32 259, i32 261, i32 229, i32 195, i32 244,
	i32 4, i32 238, i32 307, i32 169, i32 2, i32 249, i32 115, i32 332,
	i32 201, i32 19, i32 184, i32 88, i32 64, i32 29, i32 179, i32 300,
	i32 221, i32 58, i32 110, i32 240, i32 31, i32 127, i32 158, i32 318,
	i32 218, i32 139, i32 314, i32 152, i32 17, i32 217, i32 198, i32 74,
	i32 73, i32 15, i32 168, i32 84, i32 286, i32 123, i32 239, i32 250,
	i32 220, i32 321, i32 246, i32 33, i32 117, i32 138, i32 121, i32 105,
	i32 298, i32 330, i32 269, i32 214, i32 305, i32 295, i32 53, i32 46,
	i32 27, i32 144, i32 184, i32 146, i32 34, i32 321, i32 172, i32 182,
	i32 274, i32 74, i32 160, i32 1, i32 262, i32 317, i32 310, i32 158,
	i32 12, i32 154, i32 150, i32 75, i32 293, i32 102, i32 111, i32 206,
	i32 64, i32 65, i32 272, i32 44, i32 208, i32 108, i32 294, i32 210,
	i32 7, i32 205, i32 54, i32 201, i32 63, i32 295, i32 224, i32 20,
	i32 108, i32 100, i32 61, i32 141, i32 199, i32 7, i32 310, i32 169,
	i32 49, i32 272, i32 114, i32 140, i32 174, i32 165, i32 292, i32 79,
	i32 112, i32 250, i32 17, i32 72, i32 253, i32 88, i32 197, i32 86,
	i32 119, i32 265, i32 203, i32 134, i32 152, i32 105, i32 11, i32 212,
	i32 89, i32 30, i32 323, i32 135, i32 315, i32 280, i32 318, i32 263,
	i32 198, i32 39, i32 333, i32 262, i32 138, i32 289, i32 291, i32 25,
	i32 327, i32 72, i32 236, i32 264, i32 332, i32 194, i32 66, i32 87,
	i32 94, i32 112, i32 30, i32 103, i32 238, i32 36, i32 181, i32 71,
	i32 281, i32 107, i32 122, i32 205, i32 86, i32 183, i32 85, i32 309,
	i32 92, i32 179, i32 128, i32 219, i32 250, i32 292, i32 265, i32 185,
	i32 292, i32 329, i32 259, i32 224, i32 264, i32 221, i32 280, i32 277,
	i32 176, i32 162, i32 129, i32 184, i32 270, i32 256, i32 294, i32 178,
	i32 10, i32 48, i32 325, i32 90, i32 325, i32 149, i32 61, i32 135,
	i32 149, i32 60, i32 183, i32 116, i32 136, i32 283, i32 83, i32 327,
	i32 158, i32 267, i32 142, i32 306, i32 233, i32 81, i32 69, i32 204,
	i32 135, i32 222, i32 197, i32 124, i32 329, i32 53, i32 109, i32 129,
	i32 87, i32 23, i32 73, i32 128, i32 30, i32 72, i32 245, i32 308,
	i32 157, i32 23, i32 4, i32 169, i32 316, i32 122, i32 225, i32 307,
	i32 302, i32 113, i32 171, i32 31, i32 3, i32 163, i32 268, i32 29,
	i32 19, i32 187, i32 244, i32 92, i32 35, i32 5, i32 274, i32 207,
	i32 287, i32 154, i32 263, i32 279, i32 220, i32 270, i32 331, i32 75,
	i32 62, i32 254, i32 146, i32 216, i32 120, i32 133, i32 281, i32 192,
	i32 99, i32 38, i32 199, i32 301, i32 67, i32 26, i32 74, i32 77,
	i32 243, i32 190, i32 24, i32 151, i32 37, i32 314, i32 207, i32 132,
	i32 212, i32 102, i32 275, i32 56, i32 164, i32 90, i32 60, i32 131,
	i32 45, i32 132, i32 228, i32 144, i32 77, i32 222, i32 244, i32 187,
	i32 153, i32 299, i32 82, i32 326, i32 324, i32 60, i32 213, i32 95,
	i32 257, i32 152, i32 305, i32 117, i32 186, i32 6, i32 15, i32 73,
	i32 295, i32 145, i32 219, i32 51, i32 69, i32 23, i32 157, i32 125,
	i32 64, i32 111, i32 253, i32 242, i32 54, i32 52, i32 229, i32 106,
	i32 134, i32 234, i32 243, i32 79, i32 237, i32 323, i32 241, i32 128,
	i32 63, i32 151
], align 16

@marshal_methods_number_of_classes = dso_local local_unnamed_addr constant i32 0, align 4

@marshal_methods_class_cache = dso_local local_unnamed_addr global [0 x %struct.MarshalMethodsManagedClass] zeroinitializer, align 8

; Names of classes in which marshal methods reside
@mm_class_names = dso_local local_unnamed_addr constant [0 x ptr] zeroinitializer, align 8

@mm_method_names = dso_local local_unnamed_addr constant [1 x %struct.MarshalMethodName] [
	%struct.MarshalMethodName {
		i64 u0x0000000000000000, ; name: 
		ptr @.MarshalMethodName.0_name; char* name
	} ; 0
], align 8

; get_function_pointer (uint32_t mono_image_index, uint32_t class_index, uint32_t method_token, void*& target_ptr)
@get_function_pointer = internal dso_local unnamed_addr global ptr null, align 8

; Functions

; Function attributes: memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" uwtable willreturn
define void @xamarin_app_init(ptr nocapture noundef readnone %env, ptr noundef %fn) local_unnamed_addr #0
{
	%fnIsNull = icmp eq ptr %fn, null
	br i1 %fnIsNull, label %1, label %2

1: ; preds = %0
	%putsResult = call noundef i32 @puts(ptr @.str.0)
	call void @abort()
	unreachable 

2: ; preds = %1, %0
	store ptr %fn, ptr @get_function_pointer, align 8, !tbaa !3
	ret void
}

; Strings
@.str.0 = private unnamed_addr constant [40 x i8] c"get_function_pointer MUST be specified\0A\00", align 16

;MarshalMethodName
@.MarshalMethodName.0_name = private unnamed_addr constant [1 x i8] c"\00", align 1

; External functions

; Function attributes: noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8"
declare void @abort() local_unnamed_addr #2

; Function attributes: nofree nounwind
declare noundef i32 @puts(ptr noundef) local_unnamed_addr #1
attributes #0 = { memory(write, argmem: none, inaccessiblemem: none) "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" uwtable willreturn }
attributes #1 = { nofree nounwind }
attributes #2 = { noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="x86-64" "target-features"="+crc32,+cx16,+cx8,+fxsr,+mmx,+popcnt,+sse,+sse2,+sse3,+sse4.1,+sse4.2,+ssse3,+x87" "tune-cpu"="generic" }

; Metadata
!llvm.module.flags = !{!0, !1}
!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!llvm.ident = !{!2}
!2 = !{!".NET for Android remotes/origin/release/9.0.1xx @ 1dcfb6f8779c33b6f768c996495cb90ecd729329"}
!3 = !{!4, !4, i64 0}
!4 = !{!"any pointer", !5, i64 0}
!5 = !{!"omnipotent char", !6, i64 0}
!6 = !{!"Simple C++ TBAA"}
