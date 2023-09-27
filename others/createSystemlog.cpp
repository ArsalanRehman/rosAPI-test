#include <iostream>
#include <curl/curl.h>
#include <string>

int main()
{
    // Initialize libcurl
    curl_global_init(CURL_GLOBAL_ALL);

    // Set the data to be sent in the request
    std::string data = R"({
        "logType": "test",
        "logInfo": "testing log",
        "logCategory": "test"
    })";

    // Create a CURL handle
    CURL *curl = curl_easy_init();
    if (curl)
    {
        // Set the URL
        curl_easy_setopt(curl, CURLOPT_URL, "http://127.0.0.1:5050/api/v1/systemlog/createSystemlog");

        // Set the HTTP headers
        struct curl_slist *headers = nullptr;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // Set the POST data
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data.c_str());

        // Perform the HTTP POST request
        CURLcode res = curl_easy_perform(curl);

        // Check for errors
        if (res != CURLE_OK)
        {
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
        }
        else
        {
            // Get the response code
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);

            if (responseCode == 200)
            {
                // Successful response
                std::cout << "Request was successful." << std::endl;
            }
            else
            {
                std::cerr << "An error occurred. Response code: " << responseCode << std::endl;
            }
        }

        // Clean up
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    // Cleanup libcurl
    curl_global_cleanup();

    return 0;
}
