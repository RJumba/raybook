
import os
from getpass import getpass

from dotenv import load_dotenv
from supabase import create_client

# Load local environment variables
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_PUBLISHABLE_KEY")

if not url or not key:
    raise RuntimeError(
        "Missing Supabase URL or publishable key"
    )

# Connect to Supabase as an application client
supabase = create_client(url, key)

print("RAYBOOK AUTHENTICATION TEST")
print("----------------------------")

email = input("Organizer email: ").strip()
password = getpass("Password: ")

try:
    # Authenticate the organizer
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })

    if not response.user or not response.session:
        raise RuntimeError("No authenticated session returned")

    # Ask Supabase to validate the login token
    verified = supabase.auth.get_user(
        response.session.access_token
    )

    if not verified.user:
        raise RuntimeError("User verification failed")

    if verified.user.id != response.user.id:
        raise RuntimeError("Authentication identity mismatch")

    print("\nAUTHENTICATION SUCCESSFUL")
    print("User ID:", verified.user.id)
    print("Supabase Auth verified the account.")

except Exception as error:
    print("\nAUTHENTICATION FAILED")
    print(type(error).__name__)
    print("Check the credentials and Auth configuration.")

finally:
    # Do not leave the test client signed in
    try:
        supabase.auth.sign_out()
    except Exception:
        pass
