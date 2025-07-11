import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadSection from "@/components/steps/upload-section";
import { useConvertFigmaFile } from "@/hooks/useConvertFigmaFile";
import { useGlobalFormStore } from "@/hooks/useGlobalFormStore";
import { AuthData, useAuthStore } from "@/hooks/useAuthStore";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";

const TEST_IDS = {
  linkFigma: "link_figma_account_button",
  unlinkFigma: "unlink_figma_account_button",
  figmaUrlInput: "add_figma_design_url_input",
  addUrlButton: "add_figma_design_button",
  removeUploadedFile: "remove_uploaded_image_button_0",
  uploadedFilesList: "uploaded_files_list",
};

jest.mock("@/hooks/useConvertFigmaFile");
jest.mock("@/hooks/useGlobalFormStore");
jest.mock("@/hooks/useAuthStore");
jest.mock("@/hooks/useToast");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockAuthData: AuthData = {
  userId: "test-user-id",
  accessToken: "test-access-token",
  expireDate: addDays(new Date(), 2),
};

describe("UploadSection", () => {
  const mockMutate = jest.fn();
  const mockLogout = jest.fn();
  const mockPush = jest.fn();
  const toastMock = jest.fn();
  const mockSetFigmaImages = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: undefined,
      logout: mockLogout,
    });

    (useGlobalFormStore as unknown as jest.Mock).mockReturnValue({
      figmaImages: [],
      setFigmaImages: mockSetFigmaImages,
    });

    (useConvertFigmaFile as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("[unauth] renders link figma account button correctly", () => {
    render(<UploadSection />);

    expect(screen.findByTestId(TEST_IDS.linkFigma)).toBeTruthy();
  });

  test("[unauth] link figma account redirects to auth", () => {
    render(<UploadSection />);

    fireEvent.click(screen.getByTestId(TEST_IDS.linkFigma));
    expect(mockPush).toHaveBeenCalledWith("/api/figma/auth");
  });

  test("renders input and buttons correctly", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: mockAuthData,
      logout: mockLogout,
    });

    render(<UploadSection />);

    expect(screen.getByTestId(TEST_IDS.figmaUrlInput)).toBeTruthy();
    expect(screen.getByTestId(TEST_IDS.addUrlButton)).toBeTruthy();
    expect(screen.getByTestId(TEST_IDS.unlinkFigma)).toBeTruthy();
  });

  test("unlinks figma account when unlink button clicked", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: mockAuthData,
      logout: mockLogout,
    });

    render(<UploadSection />);

    fireEvent.click(screen.getByTestId(TEST_IDS.unlinkFigma));
    expect(mockLogout).toHaveBeenCalled();
  });

  test("handles successful file conversion", async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: mockAuthData,
      logout: mockLogout,
    });

    const testData = ["test-image.png"];

    (useConvertFigmaFile as jest.Mock).mockReturnValue({
      mutate: (
        _: unknown,
        { onSuccess }: { onSuccess: ({ images }: { images: string[] }) => void }
      ) => {
        onSuccess({ images: testData });
      },
      isPending: false,
    });

    render(<UploadSection />);

    const mockFigmaUrl = "https://figma.com";
    const input = screen.getByTestId(
      TEST_IDS.figmaUrlInput
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: mockFigmaUrl } });
    fireEvent.click(screen.getByTestId(TEST_IDS.addUrlButton));

    await waitFor(() => {
      expect(mockSetFigmaImages).toHaveBeenCalledWith(testData);
      expect(input.value).toBe("");
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Success", variant: "default" })
      );
    });
  });

  test("handles conversion error", async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      authData: mockAuthData,
      logout: mockLogout,
    });

    (useConvertFigmaFile as jest.Mock).mockReturnValue({
      mutate: (_: unknown, { onError }: { onError: () => void }) => {
        onError();
      },
      isPending: false,
    });

    render(<UploadSection />);

    const mockFigmaUrl = "https://figma.com";
    const input = screen.getByTestId(
      TEST_IDS.figmaUrlInput
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: mockFigmaUrl } });
    fireEvent.click(screen.getByTestId(TEST_IDS.addUrlButton));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Error", variant: "destructive" })
      );
    });
  });

  test("shows uploaded images and allows removal", () => {
    const mockImages = ["https://test-1.png", "https://test-2.png"];

    (useGlobalFormStore as unknown as jest.Mock).mockReturnValue({
      figmaImages: mockImages,
      setFigmaImages: mockSetFigmaImages,
    });

    const { rerender } = render(<UploadSection />);

    expect(
      screen.getByTestId(TEST_IDS.uploadedFilesList).children.length
    ).toEqual(2);

    fireEvent.click(screen.getByTestId(TEST_IDS.removeUploadedFile));

    mockImages.shift();
    expect(mockSetFigmaImages).toHaveBeenCalledWith(mockImages);

    rerender(<UploadSection />);

    expect(
      screen.getByTestId(TEST_IDS.uploadedFilesList).children.length
    ).toEqual(1);
  });
});
