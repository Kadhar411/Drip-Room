CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'phone',
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_phone_format;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_phone_format
  CHECK (phone IS NULL OR phone ~ '^\\+?[0-9[:space:]().-]{7,20}$');