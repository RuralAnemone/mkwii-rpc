for file in *.jpg; do
	width=$(identify -format "%w" "$file")
	height=$(identify -format "%h" "$file")

	echo $height x $width
	if [ $width -lt 512 ] || [ $height -lt 512 ]; then
		if [ $width -lt $height ]; then
			echo width is smaller, resize based on width
			mogrify -verbose -resize 512 "$file"
		else
			echo height is smaller, resize based on height
			mogrify -verbose -resize x512 "$file"
		fi
	fi
done
