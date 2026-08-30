import urllib.request
import os

def download_images():
    output_dir = 'assets/product-images'
    os.makedirs(output_dir, exist_ok=True)
    
    image_mappings = {
        'georgette_silk.jpg': 'https://images.openai.com/static-rsc-4/-UZ2J3VQDE6jOTO801MV6ugurYlxhUFlDUBBgWD_xaOqY-lMJPZNOB81BEkVXE3xbE4jMXemys3eAxbkKvFkAYN22G80S1hEwECnbSo19a91JQWTaJPkzojtcTLMtOdiCgAW_FPaGz7q1pHKDF11BICVe8V9gCirlgyv99nkSgzvz29xzN9SeteyxEnps-h6?purpose=fullsize',
        'tussar_silk.jpg': 'https://images.openai.com/static-rsc-4/pgtAkOl-Y1obEz3ewYIobyFp5-IvfsSalJFUdCK1a7x0Eyf1a5uQ75W6g0e3xVfwbKvfdfEzK-uwOshA7YCOPXikvpnRdYoCA8dxNl4Jh7KnJIKwwWnKTsQTuLjS1lprYZ0--kJwWAn-sTPZ9Rc9uVOkYCS8KoOQOtSGr6ann2Wui6w6OIMK8pDksm31FwZP?purpose=fullsize',
        'mysore_silk.jpg': 'https://images.openai.com/static-rsc-4/34BC3tXYDvUSoB_efvnXvc8qhfyZOWBk9YPQF2yQl9RG_GmPbUptjNGL6XSeVDAYmjL4W_xrFXrPRXTqGg1mVjNU3ri-Pnws5cpINlr5a25eonl2E1VojMV8roMHNI3u4XqSLUS_gVvEhfcjVPvE90dPloOZIsVy4GRP3pijXO0v8urZdY2Rh-aULCIBM7M0?purpose=fullsize',
        'paithani.jpg': 'https://images.openai.com/static-rsc-4/G69r7-plfCBX3GDEMjN_IJZhNXtbT_UacNf0B6kH4cJCU4Eh9WZzT_55bs3_s8XXPxh6XZI85a9xt_8aZ7-9ZD26PlW3yPz3yX2xB5_YMucuvaAJHNvZNcHTkLwYiMuYqivXnnXuDpk4mTWOHJPdeIM8l1R5keq1det7zuw9gRNako8luVOFzSrOTlYF6L6q?purpose=fullsize',
        'chanderi.jpg': 'https://images.openai.com/static-rsc-4/vwxTistyNx_by-7m-UoLm3esy57ZMEbMm-cPKXYkcVvxlct-IibcqGjDvYz_K6qQC0X4Y21KhFKAgT8WzjjG_LGRE6QvyC_Tyz8cOQVCodRoj1KGsjOuF0poaAIk3LTfW5MzH4qfBfgKbqa2IQJegBy6TEyvhkDMeR5sHQVkGH8P9zgIEGk44OdDUaXb_SdT?purpose=fullsize',
        'kalamkari.jpg': 'https://images.openai.com/static-rsc-4/au7COaDneP7iv51OE-gfkzriLMm6tb8lu0RDID6bO4q_O14FfCShMv-kzrocQoeTsDHTCDlYSRimOPqVGCjQUb98oiddD_cEoqOVzVSu-qiDPnUDOMH2MbekWV5ohZ_Lsl-s4ODV7YOFkmRZZzRA6kefMmqpZZJxZ8tVCse2oC-bH9CDtJDihgjg9pbtidCl?purpose=fullsize',
        'patola.jpg': 'https://images.openai.com/static-rsc-4/BuuOKB5lvb3HmiTnLGqUpySjaUj4r3z8cq5VDf_bZ64UPSDaQW78A8U0c0h1nOVX_TcRgERubDm-oLrdJH0qStO5EbC5f6QwGGU8m16xi4TAW50VO9I2bWw9jtVnVejPmqrj9Jl2TnsPGi49ejMozjeg0gQ88B-zJfcOrPlAq69VSjtw4d8Ty9aVqdaTl-Kf?purpose=fullsize',
        'chikankari.jpg': 'https://images.openai.com/static-rsc-4/yc2_Mus8yeIaGmfOVSyi1iodJJ9gahYXkCT66TpVildnY_Qs8s8NH_g9vQmFBVvBVNJB9TlNQoP-mq4ApvO9pwyoyCubuGEoOWkexmeHJHyG1T_CXLWcS0SjzpGLYLG_wgbqXZUX-Gj8xqlbICkXJw9i7PdOT9m6FPnBuAMC2cfTg7ckLrAgOjpHDci_gViK?purpose=fullsize'
    }
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    for filename, url in image_mappings.items():
        dest_path = os.path.join(output_dir, filename)
        print(f"Downloading {filename}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                with open(dest_path, 'wb') as out_file:
                    out_file.write(response.read())
            print(f"Successfully saved to {dest_path}")
        except Exception as e:
            print(f"Error downloading {filename}: {e}")

if __name__ == '__main__':
    download_images()
